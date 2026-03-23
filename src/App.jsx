import { useState } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080c0f;
    --surface: #0d1318;
    --surface2: #121920;
    --border: #1e2d35;
    --border2: #243540;
    --green: #00e5a0;
    --green-dim: #00a870;
    --amber: #f5a623;
    --red: #ff4d6a;
    --blue: #38b2ff;
    --text: #c8dce8;
    --text-dim: #5a7a8a;
    --text-muted: #324a58;
    --mono: 'IBM Plex Mono', monospace;
    --sans: 'IBM Plex Sans', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--mono); min-height: 100vh; }

  .app { max-width: 960px; margin: 0 auto; padding: 32px 24px 80px; }

  .header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
  .header-left { display: flex; flex-direction: column; gap: 6px; }
  .logo { font-size: 11px; letter-spacing: 0.3em; color: var(--green); text-transform: uppercase; font-weight: 600; }
  .title { font-size: 22px; font-weight: 500; color: #e8f4ff; letter-spacing: -0.02em; font-family: var(--sans); }
  .subtitle { font-size: 12px; color: var(--text-dim); letter-spacing: 0.05em; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 10px var(--green); animation: pulse 2s ease-in-out infinite; margin-top: 8px; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .full { grid-column: 1 / -1; }

  .panel { background: var(--surface); border: 1px solid var(--border); border-radius: 4px; overflow: hidden; }
  .panel-header { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--border); background: var(--surface2); }
  .panel-tag { font-size: 9px; letter-spacing: 0.25em; color: var(--text-dim); text-transform: uppercase; font-weight: 600; }
  .panel-title { font-size: 11px; color: var(--text); letter-spacing: 0.08em; font-weight: 500; }
  .panel-body { padding: 14px; }

  label { display: block; font-size: 10px; letter-spacing: 0.2em; color: var(--text-dim); margin-bottom: 6px; text-transform: uppercase; }
  input, textarea { width: 100%; background: var(--bg); border: 1px solid var(--border2); border-radius: 3px; color: var(--text); font-family: var(--mono); font-size: 13px; padding: 10px 12px; outline: none; transition: border-color 0.2s; resize: vertical; }
  input::placeholder, textarea::placeholder { color: var(--text-muted); }
  input:focus, textarea:focus { border-color: var(--green-dim); }
  textarea { min-height: 180px; line-height: 1.6; }
  .subject-input { margin-bottom: 10px; }

  .btn { display: inline-flex; align-items: center; gap: 8px; background: var(--green); color: #060f0c; border: none; border-radius: 3px; font-family: var(--mono); font-size: 12px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; padding: 12px 24px; cursor: pointer; transition: all 0.2s; width: 100%; justify-content: center; margin-top: 14px; }
  .btn:hover:not(:disabled) { background: #00ffc0; box-shadow: 0 0 20px rgba(0,229,160,0.3); }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .score-section { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 14px; gap: 16px; }
  .ring-wrap { position: relative; width: 120px; height: 120px; }
  .ring-svg { transform: rotate(-90deg); }
  .ring-bg { fill: none; stroke: var(--border2); stroke-width: 8; }
  .ring-fg { fill: none; stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset 1s cubic-bezier(.4,0,.2,1), stroke 0.5s; }
  .ring-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; pointer-events: none; }
  .ring-score { font-size: 26px; font-weight: 600; line-height: 1; }
  .ring-label { font-size: 9px; letter-spacing: 0.2em; color: var(--text-dim); text-transform: uppercase; margin-top: 2px; }
  .score-verdict { font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-align: center; }
  .score-detail { font-size: 11px; color: var(--text-dim); text-align: center; line-height: 1.5; }

  .dns-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); gap: 12px; }
  .dns-row:last-child { border-bottom: none; }
  .dns-name { font-size: 12px; color: var(--text); font-weight: 500; flex: 1; }
  .dns-desc { font-size: 10px; color: var(--text-dim); flex: 2; }
  .badge { font-size: 9px; font-weight: 600; letter-spacing: 0.15em; padding: 3px 8px; border-radius: 2px; text-transform: uppercase; white-space: nowrap; }
  .badge-pass { background: rgba(0,229,160,0.12); color: var(--green); border: 1px solid rgba(0,229,160,0.25); }
  .badge-fail { background: rgba(255,77,106,0.12); color: var(--red); border: 1px solid rgba(255,77,106,0.25); }
  .badge-warn { background: rgba(245,166,35,0.12); color: var(--amber); border: 1px solid rgba(245,166,35,0.25); }

  .issue { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); align-items: flex-start; }
  .issue:last-child { border-bottom: none; }
  .issue-sev { font-size: 9px; font-weight: 600; letter-spacing: 0.1em; padding: 3px 7px; border-radius: 2px; text-transform: uppercase; white-space: nowrap; margin-top: 1px; }
  .sev-high { background: rgba(255,77,106,0.1); color: var(--red); border: 1px solid rgba(255,77,106,0.2); }
  .sev-med { background: rgba(245,166,35,0.1); color: var(--amber); border: 1px solid rgba(245,166,35,0.2); }
  .sev-low { background: rgba(56,178,255,0.1); color: var(--blue); border: 1px solid rgba(56,178,255,0.2); }
  .issue-body { flex: 1; }
  .issue-title { font-size: 12px; color: var(--text); font-weight: 500; margin-bottom: 3px; }
  .issue-fix { font-size: 11px; color: var(--text-dim); line-height: 1.5; }

  .inbox-bars { display: flex; flex-direction: column; gap: 12px; padding: 6px 0; }
  .inbox-bar-label { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 5px; }
  .inbox-bar-name { color: var(--text); }
  .inbox-bar-pct { font-weight: 600; }
  .bar-track { height: 4px; background: var(--border2); border-radius: 2px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 2px; transition: width 1.2s cubic-bezier(.4,0,.2,1); }

  .content-stats { display: flex; flex-direction: column; gap: 8px; }
  .stat-row { display: flex; justify-content: space-between; font-size: 11px; padding: 6px 0; border-bottom: 1px solid var(--border); }
  .stat-row:last-child { border-bottom: none; }
  .stat-key { color: var(--text-dim); }
  .stat-val { color: var(--text); font-weight: 500; }

  .loading-bar { height: 2px; background: var(--border2); border-radius: 1px; overflow: hidden; margin: 16px 0 8px; }
  .loading-fill { height: 100%; background: linear-gradient(90deg, transparent, var(--green), transparent); width: 40%; animation: slide 1.2s ease-in-out infinite; }
  @keyframes slide { 0%{transform:translateX(-100%)} 100%{transform:translateX(350%)} }
  .loading-text { font-size: 11px; color: var(--text-dim); letter-spacing: 0.1em; text-align: center; }

  .empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 32px; }
  .empty-icon { font-size: 28px; opacity: 0.3; }
  .empty-text { font-size: 11px; color: var(--text-muted); letter-spacing: 0.1em; text-align: center; }

  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .fade-in { animation: fadeIn 0.4s ease forwards; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
`;

function scoreColor(s) { return s >= 80 ? "#00e5a0" : s >= 55 ? "#f5a623" : "#ff4d6a"; }
function scoreLabel(s) { return s >= 80 ? "LIKELY INBOX" : s >= 55 ? "RISKY" : "LIKELY SPAM"; }
function circumference(r) { return 2 * Math.PI * r; }

async function checkDNS(domain, type) {
  try {
    const res = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`);
    const data = await res.json();
    return data.Answer || [];
  } catch { return []; }
}

async function analyzeDNS(domain) {
  const [spf, dmarc, dkim] = await Promise.all([
    checkDNS(domain, "TXT"),
    checkDNS(`_dmarc.${domain}`, "TXT"),
    checkDNS(`default._domainkey.${domain}`, "TXT"),
  ]);
  const spfRecord = spf.find(r => r.data?.includes("v=spf1"));
  const dmarcRecord = dmarc.find(r => r.data?.includes("v=DMARC1"));
  const dkimRecord = dkim.find(r => r.data?.includes("v=DKIM1"));

  let spfStatus = "fail", spfDesc = "No SPF record found";
  if (spfRecord) {
    spfStatus = spfRecord.data.includes("+all") ? "warn" : "pass";
    spfDesc = spfRecord.data.includes("+all") ? "SPF too permissive (+all)" : spfRecord.data.substring(0, 60) + (spfRecord.data.length > 60 ? "…" : "");
  }
  let dmarcStatus = "fail", dmarcDesc = "No DMARC record found";
  if (dmarcRecord) {
    dmarcStatus = dmarcRecord.data.includes("p=none") ? "warn" : "pass";
    dmarcDesc = dmarcRecord.data.includes("p=none") ? "DMARC policy is 'none' (monitoring only)" : dmarcRecord.data.substring(0, 60) + (dmarcRecord.data.length > 60 ? "…" : "");
  }
  let dkimStatus = "fail", dkimDesc = "Default DKIM selector not found (check your ESP's selector)";
  if (dkimRecord) { dkimStatus = "pass"; dkimDesc = "DKIM record found for default selector"; }

  return { spf: { status: spfStatus, desc: spfDesc }, dmarc: { status: dmarcStatus, desc: dmarcDesc }, dkim: { status: dkimStatus, desc: dkimDesc } };
}

// ── KEY CHANGE: calls /api/analyze instead of Anthropic directly ──────────
async function analyzeWithClaude(fromEmail, subject, body, dnsResults) {
  const prompt = `You are an email deliverability expert. Analyze this cold email and return ONLY a JSON object — no markdown, no explanation.

FROM: ${fromEmail}
SUBJECT: ${subject || "(no subject)"}
BODY:
${body}

DNS RESULTS:
- SPF: ${dnsResults.spf.status} — ${dnsResults.spf.desc}
- DKIM: ${dnsResults.dkim.status} — ${dnsResults.dkim.desc}
- DMARC: ${dnsResults.dmarc.status} — ${dnsResults.dmarc.desc}

Return this exact JSON shape:
{
  "spamScore": <0-100, 0=clean, 100=definite spam>,
  "inboxScore": <0-100 overall inbox probability>,
  "gmailProbability": <0-100>,
  "outlookProbability": <0-100>,
  "yahooMailProbability": <0-100>,
  "wordCount": <number>,
  "linkCount": <number>,
  "spamWordCount": <number>,
  "hasUnsubscribeLink": <true|false>,
  "readingLevel": "<e.g. Grade 8>",
  "sentiment": "<Positive|Neutral|Negative>",
  "issues": [
    { "severity": "<high|medium|low>", "title": "<short title>", "fix": "<1-2 sentence actionable fix>" }
  ]
}`;

  // Calls your Vercel proxy — no API key in the browser
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Proxy request failed");
  }

  const data = await response.json();
  const text = data.content?.find(b => b.type === "text")?.text || "{}";
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

// ── components ─────────────────────────────────────────────────────────────

function ScoreRing({ score }) {
  const r = 52, c = circumference(r);
  const color = scoreColor(score);
  return (
    <div className="score-section">
      <div className="ring-wrap">
        <svg className="ring-svg" width="120" height="120" viewBox="0 0 120 120">
          <circle className="ring-bg" cx="60" cy="60" r={r} />
          <circle className="ring-fg" cx="60" cy="60" r={r} stroke={color}
            strokeDasharray={c} strokeDashoffset={c - (score / 100) * c}
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }} />
        </svg>
        <div className="ring-text">
          <div className="ring-score" style={{ color }}>{score}</div>
          <div className="ring-label">INBOX</div>
        </div>
      </div>
      <div className="score-verdict" style={{ color }}>{scoreLabel(score)}</div>
    </div>
  );
}

function DNSRow({ name, status, desc }) {
  const cls = status === "pass" ? "badge-pass" : status === "warn" ? "badge-warn" : "badge-fail";
  const label = status === "pass" ? "✓ PASS" : status === "warn" ? "⚠ WARN" : "✗ FAIL";
  return (
    <div className="dns-row">
      <span className="dns-name">{name}</span>
      <span className="dns-desc">{desc}</span>
      <span className={`badge ${cls}`}>{label}</span>
    </div>
  );
}

function InboxBar({ name, pct }) {
  const color = scoreColor(pct);
  return (
    <div className="inbox-bar">
      <div className="inbox-bar-label">
        <span className="inbox-bar-name">{name}</span>
        <span className="inbox-bar-pct" style={{ color }}>{pct}%</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}60` }} />
      </div>
    </div>
  );
}

function IssueItem({ severity, title, fix }) {
  const cls = severity === "high" ? "sev-high" : severity === "medium" ? "sev-med" : "sev-low";
  return (
    <div className="issue">
      <span className={`issue-sev ${cls}`}>{severity}</span>
      <div className="issue-body">
        <div className="issue-title">{title}</div>
        <div className="issue-fix">{fix}</div>
      </div>
    </div>
  );
}

// ── main ───────────────────────────────────────────────────────────────────

export default function App() {
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [result, setResult] = useState(null);
  const [dns, setDns] = useState(null);
  const [error, setError] = useState("");

  const domain = fromEmail.includes("@") ? fromEmail.split("@")[1]?.trim() : "";

  async function handleAnalyze() {
    if (!fromEmail || !body.trim()) return;
    setLoading(true); setResult(null); setDns(null); setError("");
    try {
      setLoadingStep("Querying DNS records…");
      const dnsResults = await analyzeDNS(domain || "example.com");
      setDns(dnsResults);
      setLoadingStep("Analyzing content…");
      const analysis = await analyzeWithClaude(fromEmail, subject, body, dnsResults);
      setResult(analysis);
    } catch (e) {
      setError("Analysis failed: " + e.message);
    } finally {
      setLoading(false); setLoadingStep("");
    }
  }

  const canRun = fromEmail.includes("@") && body.trim().length > 10 && !loading;

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        <div className="header">
          <div className="header-left">
            <span className="logo">// deliverability.check</span>
            <span className="title">Email Deliverability Analyzer</span>
            <span className="subtitle">SPF · DKIM · DMARC · Content · Inbox Probability</span>
          </div>
          <div className="status-dot" />
        </div>

        <div className="grid">
          <div className="panel full">
            <div className="panel-header"><span className="panel-tag">01</span><span className="panel-title">EMAIL PAYLOAD</span></div>
            <div className="panel-body">
              <div className="subject-input">
                <label>From Address</label>
                <input type="email" placeholder="you@yourdomain.com" value={fromEmail} onChange={e => setFromEmail(e.target.value)} />
              </div>
              <div className="subject-input" style={{ marginTop: 10 }}>
                <label>Subject Line</label>
                <input type="text" placeholder="Your subject line…" value={subject} onChange={e => setSubject(e.target.value)} />
              </div>
              <div style={{ marginTop: 10 }}>
                <label>Email Body</label>
                <textarea placeholder="Paste your full email body here…" value={body} onChange={e => setBody(e.target.value)} />
              </div>
              <button className="btn" onClick={handleAnalyze} disabled={!canRun}>
                ⟳ {loading ? loadingStep || "Analyzing…" : "Run Deliverability Check"}
              </button>
              {loading && <div className="loading-bar" style={{ marginTop: 8 }}><div className="loading-fill" /></div>}
              {error && <div style={{ color: "var(--red)", fontSize: 12, marginTop: 10 }}>{error}</div>}
            </div>
          </div>
        </div>

        {domain && dns && (
          <div className="grid fade-in">
            <div className="panel full">
              <div className="panel-header"><span className="panel-tag">02</span><span className="panel-title">DNS AUTHENTICATION — {domain}</span></div>
              <div className="panel-body">
                <DNSRow name="SPF" status={dns.spf.status} desc={dns.spf.desc} />
                <DNSRow name="DKIM" status={dns.dkim.status} desc={dns.dkim.desc} />
                <DNSRow name="DMARC" status={dns.dmarc.status} desc={dns.dmarc.desc} />
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="fade-in" style={{ marginTop: 16 }}>
            <div className="grid">
              <div className="panel">
                <div className="panel-header"><span className="panel-tag">03</span><span className="panel-title">INBOX SCORE</span></div>
                <ScoreRing score={result.inboxScore ?? 50} />
                <div className="panel-body" style={{ paddingTop: 0 }}>
                  <div className="score-detail">Spam signal: <span style={{ color: scoreColor(100 - (result.spamScore ?? 50)), fontWeight: 600 }}>{result.spamScore ?? "—"}/100</span></div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-header"><span className="panel-tag">04</span><span className="panel-title">INBOX BY CLIENT</span></div>
                <div className="panel-body">
                  <div className="inbox-bars">
                    <InboxBar name="Gmail" pct={result.gmailProbability ?? 50} />
                    <InboxBar name="Outlook" pct={result.outlookProbability ?? 50} />
                    <InboxBar name="Yahoo Mail" pct={result.yahooMailProbability ?? 50} />
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-header"><span className="panel-tag">05</span><span className="panel-title">CONTENT ANALYSIS</span></div>
                <div className="panel-body">
                  <div className="content-stats">
                    <div className="stat-row"><span className="stat-key">Word count</span><span className="stat-val">{result.wordCount ?? "—"}</span></div>
                    <div className="stat-row"><span className="stat-key">Links</span><span className="stat-val">{result.linkCount ?? "—"}</span></div>
                    <div className="stat-row"><span className="stat-key">Spam words</span><span className="stat-val" style={{ color: (result.spamWordCount ?? 0) > 2 ? "var(--red)" : "var(--green)" }}>{result.spamWordCount ?? "—"}</span></div>
                    <div className="stat-row"><span className="stat-key">Unsubscribe link</span><span className="stat-val" style={{ color: result.hasUnsubscribeLink ? "var(--green)" : "var(--amber)" }}>{result.hasUnsubscribeLink ? "Yes" : "Missing"}</span></div>
                    <div className="stat-row"><span className="stat-key">Reading level</span><span className="stat-val">{result.readingLevel ?? "—"}</span></div>
                    <div className="stat-row"><span className="stat-key">Sentiment</span><span className="stat-val">{result.sentiment ?? "—"}</span></div>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-header"><span className="panel-tag">06</span><span className="panel-title">ISSUES & FIXES</span></div>
                <div className="panel-body">
                  {(result.issues ?? []).length === 0
                    ? <div className="empty"><div className="empty-icon">✓</div><div className="empty-text">No issues detected</div></div>
                    : (result.issues ?? []).map((iss, i) => <IssueItem key={i} {...iss} />)
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {!result && !loading && (
          <div style={{ marginTop: 16 }}>
            <div className="panel">
              <div className="panel-body">
                <div className="empty" style={{ padding: "48px 0" }}>
                  <div className="empty-icon">📡</div>
                  <div className="empty-text">Paste your email above and run the check<br/>to see your deliverability report.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
