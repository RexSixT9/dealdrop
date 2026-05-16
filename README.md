# DealDrop

<p align="center">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="public/logo-navbar-dark-compact.svg" />
		<img src="public/logo-navbar-light-compact.svg" alt="DealDrop logo" height="64" />
	</picture>
</p>

<p align="center">
	<strong>Track product prices, get drop alerts, and act fast.</strong>
</p>

<p align="center">
	<a href="https://deals.r6t9.space/">Live Demo</a>
	·
	<a href="https://github.com/RexSixT9/dealdrop">Repository</a>
	·
	<a href="#setup-instructions-">Get Started</a>
</p>

<p align="center">
	<img alt="License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" />
	<img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black" />
	<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue" />
	<img alt="Supabase" src="https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3FCF8E" />
</p>

DealDrop is a price-tracking web app that lets users paste product links, track price changes, and get alerts when a price drops. 📉

## Screenshots 📸

**Desktop**

| Light | Dark |
| --- | --- |
| ![DealDrop desktop light](public/screenshots/app-desktop-light.png) | ![DealDrop desktop dark](public/screenshots/app-desktop-dark.png) |


## Features ✨

- Track products by URL with instant scraping 🔎
- Watchlist with price history charts 📊
- Email alerts on price drops 📬
- Supabase auth with Google and GitHub OAuth, plus per-user product tracking 🔐
- Scheduled price checks via cron endpoint ⏱️

## Tech Stack 🧰

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Supabase (auth + database)
- Firecrawl (product scraping)
- Resend (email notifications)
- Recharts (price charts)

## Why These Choices ✅

- Next.js App Router for file-based routing, server components, and easy deployment.
- React for a predictable component model and fast UI iteration.
- TypeScript for safer refactors and fewer runtime errors.
- Tailwind CSS to keep styles close to components and ship UI quickly.
- Supabase to get auth, database, and row-level security with minimal setup.
- Firecrawl to reliably extract product data from messy, real-world pages.
- Resend for straightforward, reliable transactional email delivery.
- Recharts to visualize price history with accessible, responsive charts.

## Architecture 🧭

- UI in App Router pages and components
- Server actions for product add/delete and history reads
- Supabase for auth, products, and price history
- Firecrawl for scraping product metadata and prices
- Cron endpoint for scheduled price checks and alert fan-out

## How It Works ⚙️

1. Sign in with Supabase auth to create your private watchlist.
2. Paste a product URL to start tracking; Firecrawl scrapes title, price, and image.
3. A cron job calls the check endpoint to refresh prices on a schedule.
4. Price history is stored in Supabase and displayed in charts.
5. When the price drops, Resend sends an alert email with a direct link.

## Prerequisites 📋

Before you begin, make sure you have:

- Node.js 18 or newer
- A Supabase project with auth and database access
- Firecrawl API credentials
- Resend API credentials
- Google OAuth credentials from Google Cloud Console
- GitHub OAuth credentials from GitHub Developer Settings
- A deployment target such as Vercel, Railway, or another Node.js host

## Setup Instructions 🚀

1. Clone the repository and install dependencies.

```bash
git clone https://github.com/RexSixT9/dealdrop.git
cd dealdrop
npm install
```

2. Set up Supabase.

- Create or reuse a Supabase project.
- Configure your database schema and RLS policies for `products` and `price_history`.
- In Authentication > Providers, enable Google and GitHub.
- In Authentication > URL Configuration, set:
	- Site URL: `https://deals.r6t9.space`
	- Additional Redirect URLs: `https://deals.r6t9.space/auth/callback` and any local dev callback URLs you use
- Copy the Supabase project URL and publishable key from Settings > API.

3. Set up Firecrawl.

- Create a Firecrawl account.
- Copy your Firecrawl API key into `FIRECRAWL_API_KEY`.

4. Set up Resend.

- Create a Resend account.
- Verify your sending domain if you are using a custom sender address.
- Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`.

5. Create your environment file.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
# or use NEXT_PUBLIC_SUPABASE_ANON_KEY instead

SUPABASE_SERVICE_ROLE_KEY=

FIRECRAWL_API_KEY=

RESEND_API_KEY=
RESEND_FROM_EMAIL=

NEXT_PUBLIC_APP_URL=https://deals.r6t9.space

CRON_SECRET=
```

6. Run the app locally.

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Project Structure 📁

```
app/
	api/
		cron/
			check-prices/
				route.ts
	auth/
		actions.ts
		callback/
			route.ts
	globals.css
	layout.tsx
	manifest.ts
	page.tsx
	robots.ts
	sitemap.ts
components/
	ui/
	AddProductForm.tsx
	AuthButton.tsx
	AuthModal.tsx
	Footer.tsx
	PriceChart.tsx
	ProductCard.tsx
	PwaProvider.tsx
	mode-toggle.tsx
	theme-provider.tsx
constants/
	data.ts
lib/
	firecrawl/
		firecrawl.ts
	supabase/
		client.ts
		env.ts
		middleware.ts
		proxy.ts
		server.ts
	email.ts
	utils.ts
public/
	screenshots/
	sw.js
```

## Live Demo 🌐

https://deals.r6t9.space/

## Environment Variables 🔧

Create a .env.local file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
# or use NEXT_PUBLIC_SUPABASE_ANON_KEY instead

SUPABASE_SERVICE_ROLE_KEY=

FIRECRAWL_API_KEY=

RESEND_API_KEY=
RESEND_FROM_EMAIL=

NEXT_PUBLIC_APP_URL=http://localhost:3000

CRON_SECRET=
```

Notes:

- `SUPABASE_SERVICE_ROLE_KEY` is required for the cron price check endpoint.
- `CRON_SECRET` is used as a Bearer token for scheduled checks.
- `NEXT_PUBLIC_APP_URL` should match the deployed site origin in production, for example `https://deals.r6t9.space`.
- `NEXT_PUBLIC_APP_URL` is used in email templates and metadata links.

## Configuration Overview ⚙️

| Variable | Used For | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase client key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Cron price checks | Yes |
| `FIRECRAWL_API_KEY` | Product scraping | Yes |
| `RESEND_API_KEY` | Email delivery | Yes |
| `RESEND_FROM_EMAIL` | Email sender | Yes |
| `NEXT_PUBLIC_APP_URL` | Email links | Yes |
| `CRON_SECRET` | Cron auth token | Yes |

## Scripts 📦

- `npm run dev` - start dev server
- `npm run dev:m` - start dev server (0.0.0.0)
- `npm run build` - build for production
- `npm run start` - start production server
- `npm run lint` - run ESLint

## Production Deployment 📤

1. Set all environment variables in your hosting provider.
2. Set `NEXT_PUBLIC_APP_URL` to `https://deals.r6t9.space` in production.
3. In Supabase, update Authentication > URL Configuration to match the live domain.
4. In Supabase, confirm the Google and GitHub providers are enabled and configured.
5. In Google Cloud Console, add the Supabase OAuth callback URL from your Supabase dashboard to the authorized redirect URIs.
6. In GitHub Developer Settings, add the same Supabase OAuth callback URL to the OAuth app callback URL.
7. Configure your scheduled price check to call `/api/cron/check-prices` with the `CRON_SECRET` bearer token.
8. Redeploy after changing any auth or environment settings.

## Cron Price Checks 🕒

Price checks run through the route handler in [app/api/cron/check-prices/route.ts](app/api/cron/check-prices/route.ts).

Example request:

```bash
curl -X POST \
	-H "Authorization: Bearer <CRON_SECRET>" \
	http://localhost:3000/api/cron/check-prices
```

## Testing 🧪

- Run `npm run lint` before merging changes.
- Test Google sign-in and GitHub sign-in on the deployed site.
- Verify `/auth/callback` returns you to the app after authentication.
- Trigger the cron endpoint manually after deployment and confirm it updates prices.
- Check Supabase logs and Resend logs if price alerts do not arrive.

## Troubleshooting 🐛

### Login redirects to the wrong domain

- Confirm `NEXT_PUBLIC_APP_URL` matches the deployed origin.
- Confirm Supabase Site URL and Additional Redirect URLs use `https://deals.r6t9.space`.

### Google or GitHub sign-in fails

- Make sure the provider is enabled in Supabase.
- Verify the OAuth client or app callback URL points to the Supabase callback URL shown in the dashboard.
- Recheck the client ID and client secret values in Supabase.

### Cron job does not update products

- Confirm `SUPABASE_SERVICE_ROLE_KEY` and `CRON_SECRET` are set in production.
- Verify the cron request includes `Authorization: Bearer <CRON_SECRET>`.
- Check that the cron URL points to the deployed domain.

### Emails are not sending

- Verify `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are correct.
- Confirm the sender domain is verified in Resend.
- Check the email logs in the Resend dashboard.

### Product scraping fails on a site

- Some stores block scraping or need custom handling.
- Check the Firecrawl dashboard for extraction errors.
- Try the same product URL manually to verify the page is publicly accessible.

## Contributing 🤝

1. Fork the repo
2. Create a feature branch
3. Submit a pull request

## License 📄

Apache License 2.0
