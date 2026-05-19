# Authentication

Authentication strategy, session management, protected routes, and the owner-only access model.

---

## Overview

This is a **single-owner application**. Only Sarthak (the site owner) needs to authenticate. Authentication gates the dashboard and resume editor. All public-facing pages (homepage, resume view, portfolio) are fully public.

---

## Library: Better Auth

**Package:** `better-auth`

Better Auth handles:
- Session management (server-side sessions stored in DB)
- OAuth providers (Google, GitHub)
- Email + password authentication
- Passkeys (WebAuthn) — passwordless login from trusted devices
- CSRF protection
- Route protection via middleware

---

## Configured Providers

| Provider | Use case |
|---|---|
| Email + Password | Primary auth method |
| Google OAuth | Quick sign-in |
| GitHub OAuth | Quick sign-in |
| Passkeys | Passwordless from trusted browser |

---

## Setup

### Server Configuration

```ts
// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { passkey } from "@better-auth/passkey";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [passkey()],
});
```

### Route Handler

```ts
// src/app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

### Client Instance

```ts
// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";

export const authClient = createAuthClient({
  plugins: [passkeyClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
```

---

## Session Access

### In Server Components
```ts
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({ headers: await headers() });
if (!session) redirect("/login");
```

### In Client Components
```ts
import { useSession } from "@/lib/auth-client";

const { data: session, isPending } = useSession();
```

### In Server Actions
```ts
"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function someAction() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  // ...
}
```

---

## Route Protection

### Middleware (Next.js)

```ts
// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

### Protected Routes

| Route Pattern | Auth Required | Notes |
|---|---|---|
| `/dashboard/**` | Yes | Full middleware protection |
| `/dashboard/resumes/[id]/edit` | Yes | Also validates resource ownership |
| `/resume/[slug]` | No | Public if `isPublic === true` |
| `/api/auth/**` | No | Better Auth handles internally |
| All other routes | No | Public |

---

## Owner Model

Since this is a personal site, there is effectively **one admin user**. The app does not have a user registration flow for arbitrary users. Sign-up may be disabled in production via environment variable:

```
DISABLE_SIGNUP=true    # Prevents new account creation in production
```

Only the pre-seeded owner account (Sarthak) can access the dashboard.

---

## Session Tables (DB)

Better Auth manages these tables automatically via the Drizzle adapter:
- `users` — user records
- `sessions` — active sessions
- `accounts` — OAuth provider links per user
- `verifications` — email verification tokens
- `passkeys` — registered passkey credentials

These are created by the Better Auth migration. Do not define them manually in `src/db/schema.ts`.

---

## Security Notes

- Sessions are HTTP-only cookies. Never access the session token from JavaScript.
- CSRF protection is built into Better Auth.
- OAuth redirect URIs must be registered in each provider's developer console.
- In production, `BETTER_AUTH_SECRET` must be a 32+ character random string.
- Never log session tokens or user IDs in client-side code.
