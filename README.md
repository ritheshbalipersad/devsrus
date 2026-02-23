# devsrus

A vibrant, mobile-friendly website for **devsrus**—a software development company that builds custom solutions for small to medium enterprises (automation, paperwork replacement, spreadsheet alternatives).

## Features

- **Mobile-first responsive design** — Works great on phones, tablets, and desktops
- **Home** — Hero, services preview, call-to-action
- **Services** — Detailed service offerings
- **Products** — Product catalog (managed via admin)
- **Contact** — Form that saves inquiries and optionally emails you
- **Admin** — Add/delete products, view inquiries, mark as replied

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and configure:
   - `CONTACT_EMAIL` — Where to receive contact form messages
   - SMTP settings (optional) — For sending emails. Without SMTP, inquiries are still saved to `data/inquiries.json`.

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Admin

- **Dashboard**: `/admin`
- **Products**: Add new products with name, category, description, and optional image URL
- **Inquiries**: View contact form submissions, click email to reply, mark as replied when done

## Email configuration

To receive contact form submissions by email, set these in `.env.local`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=you@yourcompany.com
```

For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.
