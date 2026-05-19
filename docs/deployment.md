# Deployment

Environments, environment variables, deployment targets, and CI/CD.

---

## Environments

| Environment | URL | Branch | Database |
|---|---|---|---|
| Local dev | localhost:3000 | any | Local PostgreSQL / Neon dev |
| Preview | Vercel preview URL | PR branches | Neon dev |
| Production | sarthak.dev (TBD) | `main` | Railway / Supabase |

---

## Deployment Targets

### Frontend: Vercel
- Connected to GitHub repo via Vercel GitHub integration
- Auto-deploys on push to `main` → production
- Auto-creates preview deployments for PRs
- Configuration: `vercel.json` (if needed for rewrites/headers)
- Next.js on Vercel: zero-config, serverless functions for Route Handlers and Server Actions

### Database: Railway or Supabase
- **Railway:** Simple Postgres hosting, easy env var injection
- **Supabase:** Postgres with studio, auth extras (not used — we use Better Auth)
- Connection via `DATABASE_URL` env var

---

## Environment Variables

All variables must be defined in `src/lib/env.ts` with Zod validation. The app will fail to start if required vars are missing.

### Required (all environments)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | 32+ char random string for session signing |
| `NEXT_PUBLIC_APP_URL` | Full URL of the app (e.g., `https://sarthak.dev`) |

### Auth Providers (configure as needed)

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |

### Email

| Variable | Description |
|---|---|
| `SMTP_HOST` | SMTP server host (e.g., smtp.resend.com) |
| `SMTP_PORT` | SMTP port (usually 587) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `EMAIL_FROM` | From address (e.g., `Sarthak <hello@sarthak.dev>`) |

### Optional / Feature Flags

| Variable | Default | Description |
|---|---|---|
| `DISABLE_SIGNUP` | `false` | Set `true` in production to block new registrations |
| `NEXT_PUBLIC_GA_ID` | — | Google Analytics ID (if analytics added) |

---

## Local Development

Create `.env.local` from the template:

```bash
cp .env.example .env.local
```

`.env.local` is gitignored and must never be committed.

`.env.example` should be kept up to date with every new variable (use placeholder values, no real secrets).

---

## Production Checklist

Before deploying to production:

- [ ] `DISABLE_SIGNUP=true` is set (prevents unauthorized registration)
- [ ] `BETTER_AUTH_SECRET` is a strong random string (not reused from dev)
- [ ] `NEXT_PUBLIC_APP_URL` matches the actual production domain
- [ ] OAuth redirect URIs are registered for the production domain in Google/GitHub developer consoles
- [ ] SMTP is configured and tested (contact form sends correctly)
- [ ] Database is migrated: `pnpm db:migrate` (not `db:push`)
- [ ] `pnpm build` succeeds without errors locally
- [ ] Environment variables are set in Vercel project settings

---

## Migrations in Production

**Never use `pnpm db:push` in production.** This can cause data loss.

```bash
# Generate migration from schema change
pnpm db:generate

# Review the generated SQL in drizzle/migrations/
# Commit the migration file

# Apply in production (run as part of deployment or manually)
pnpm db:migrate
```

---

## Performance Headers

Add to `next.config.ts` for security and performance:

```ts
const headers = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",   // ← tighten once stable
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
    ].join("; "),
  },
];
```

---

## Domain & DNS (Production)

TBD — fill in when domain is registered.

| Record | Type | Value |
|---|---|---|
| `@` / `www` | CNAME | Vercel |
| `mx` | MX | — |
