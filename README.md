# Email Deliverability Checker

A pre-send email deliverability checker that analyzes SPF, DKIM, DMARC records and uses AI to score your email's inbox probability.

## Deploy to Vercel

1. Fork or upload this repo to your GitHub account
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import this repository
4. Under **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
5. Click **Deploy**

That's it. Vercel auto-detects the Vite + React setup and the `api/` folder as serverless functions.

## Embed in WordPress

Once deployed, grab your Vercel URL and paste this into any WordPress page (via an HTML block):

```html
<iframe src="https://your-app.vercel.app" width="100%" height="950px" frameborder="0" style="border:none;"></iframe>
```

## Project Structure

```
├── api/
│   └── analyze.js      # Serverless proxy — keeps your API key secret
├── src/
│   ├── main.jsx        # React entry point
│   └── App.jsx         # Main app component
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```
