# Deploy Next.js on Hostinger Node.js web apps hosting

[![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/web-apps-hosting)

## What this repository provides

- A minimal Next.js starter app
- Hostinger-specific deployment settings
- A checklist for environment variables and production readiness
- Troubleshooting notes for common deployment issues

## Requirements

- A Hostinger plan with Node.js web apps hosting enabled
- A GitHub repository containing your Next.js app
- Node.js 20 LTS recommended

## Quick start (local)

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy on Hostinger Node.js web apps hosting

1. Push this app (or your own Next.js app) to GitHub.
2. Log in to Hostinger hPanel, go to **Websites** in the sidebar, and click **Add Website**.
3. Choose **Node.js Apps**.
4. Select **Import Git Repository**.
5. Authorize GitHub access and select your repository.
6. Review the auto-detected build settings and configure:
   - **Install command**: `npm ci`
   - **Build command**: `npm run build`
   - **Start command**: `npm run start -- -p $PORT`
   - **Node.js version**: `20`
7. Add required environment variables in the Hostinger app settings.
8. Click **Deploy**.

## Environment variables

- Keep local defaults in `.env.local`.
- Configure production values in Hostinger Node.js web apps hosting settings.
- Never commit secrets.

Example variables:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.example
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.example
```

## Production checklist

- `npm run build` succeeds locally
- `npm run start -- -p 3000` starts without errors
- All required env vars are configured in Hostinger
- `next.config.mjs` reviewed for your app needs (images, headers, rewrites)

## Troubleshooting

### Build fails due to missing environment variables

Set all required variables in Hostinger before deploying.

### App starts locally but fails in platform runtime

Use the start command with platform port binding:

```bash
npm run start -- -p $PORT
```

### Static assets or images fail

Review `next.config.mjs` image domains and output settings.

## Link target for Next.js docs references

If you need a Next.js-specific Hostinger reference link in external docs, use this repository URL:

`https://github.com/hostinger/deploy-nextjs`
