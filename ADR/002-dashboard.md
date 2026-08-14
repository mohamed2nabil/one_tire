# ADR 002: Dashboard Architecture & Migration

**Decision:**
Migrate the legacy dashboard incrementally, applying Role-Based Access Control (RBAC) and strictly isolating CSS.

**Context:**
The previous dashboard assumes a single Admin role and uses legacy CSS that conflicts with the modern Tailwind v4 setup on the public landing page.

**Alternatives:**
- Blindly copying the folder (Leads to CSS bleed).
- Rewriting the dashboard from scratch (Violates reuse policy).

**Why this approach was selected:**
Incremental migration ensures we reuse proven logic while fixing stylistic debt and injecting necessary security (RBAC).

**Tradeoffs:**
Migration will take slightly longer upfront to strip out legacy styles and refactor into CSS Modules/Tailwind v4.
