# SIXORIA SARL website

The website is a React, TypeScript, and Vite application. The active site entry point is `src/main.tsx`; `public/Sixoria_Site_V2.html` is a legacy standalone page.

## Local development

```sh
npm install
npm run dev
```

Run `npm run typecheck` and `npm run build` to validate changes and create the production bundle.

## Contact form

The form submits to the Vercel serverless endpoint at `/api/contact`. To send real email, configure these server-side environment variables in Vercel:

- `RESEND_API_KEY` — Resend API key.
- `CONTACT_FROM_EMAIL` — sender address verified with Resend.
- `CONTACT_TO_EMAIL` — recipient address (defaults to `contact@sixoria.cm`).

Do not add these secrets to `VITE_` variables or commit them. The form reports an error instead of success when the endpoint or provider is unavailable. The Vercel CLI's `vercel dev` can be used to run the serverless endpoint locally.

## WhatsApp and SIXORIA AI

`VITE_WHATSAPP_NUMBER` may override the existing WhatsApp number (`237621961547`). `VITE_CHATBOT_API_URL` selects the backend chat endpoint. Configure `OPENROUTER_API_KEY` or `OPENAI_API_KEY` only in the server environment; never expose an AI provider key to the browser. Without a working AI backend, SIXORIA AI uses its clearly labeled demo responses based on the site's company information.
