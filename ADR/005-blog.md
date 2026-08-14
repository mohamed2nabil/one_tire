# ADR 005: Blog Architecture

**Decision:**
Build a custom Blog CMS into the Admin dashboard leveraging Prisma and the legacy Media Metadata tagging.

**Context:**
The platform needs SEO-optimized blog posts that can later be syndicated via n8n.

**Alternatives:**
- Use an external headless CMS like Sanity or Contentful.

**Why this approach was selected:**
Keeps the entire architecture self-contained, reuses the legacy `imageMetadata.ts`, and ensures complete control over the outgoing webhooks for n8n.

**Tradeoffs:**
We must build rich-text editing and image uploading UI ourselves instead of relying on a third-party CMS.
