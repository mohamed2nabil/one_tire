# ADR 001: Authentication Strategy

**Decision:**
Use Firebase Client SDK for initial authentication, then immediately exchange the token for a secure HTTP-only Session Cookie verified by Firebase Admin SDK.

**Context:**
The Next.js App Router (especially Edge Middleware) cannot read LocalStorage or IndexedDB where the standard Firebase Client stores its tokens. 

**Alternatives:**
- Using `next-firebase-auth-edge` library (Added dependency).
- Using NextAuth/Auth.js (Requires moving away from Firebase Auth).

**Why this approach was selected:**
It retains the ease of Firebase UI/login methods while providing robust, server-side security compatible with Next.js Middleware.

**Tradeoffs:**
Requires building a custom API endpoint (`/api/auth/session`) to mint the cookie manually.
