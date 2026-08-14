# ADR 003: Database Strategy

**Decision:**
Use Prisma as the ORM but delay specific connection pooling architecture (e.g., PgBouncer) until the hosting infrastructure is finalized.

**Context:**
Serverless environments can exhaust relational database connections rapidly. 

**Alternatives:**
- Hardcoding Prisma Accelerate now.
- Switching to a NoSQL database (Firestore).

**Why this approach was selected:**
Prisma provides type-safety and reuse of the legacy `db.ts`, but locking in a pooling strategy now might conflict with the final hosting choice (e.g., Vercel vs AWS).

**Tradeoffs:**
Local development will not mirror production connection limits exactly until the final infrastructure is set.
