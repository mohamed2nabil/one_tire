# ONE TIRE — Final CMS, Dashboard & Production Evolution

The project has reached the final production stage.

The goal is no longer to build a landing page, but to transform ONE TIRE into a complete self-managed CMS with a premium Admin Dashboard, scalable architecture, excellent SEO, and effortless content management.

**Important Rules**

- Preserve the current architecture whenever possible.
- Do not rewrite working business logic.
- Refactor only where it improves maintainability, performance, or scalability.
- Keep the codebase lightweight (YAGNI / DRY / KISS).
- The final result should feel like a commercial SaaS platform.

---

# 1. Admin Dashboard Refactor

Completely refactor the Admin Dashboard.

Goals:

- Reduce complexity.
- Remove duplicated logic.
- Eliminate existing errors.
- Reuse components.
- Better folder organization.
- Better separation between UI and business logic.
- Improve forms.
- Improve validation.
- Improve uploads.
- Improve loading states.
- Improve error handling.
- Improve table components.
- Improve editors.
- Make the Dashboard production-ready.

---

# 2. Authentication & Sessions

Improve the authentication system.

Requirements:

- Persistent login session.
- Automatic session restoration.
- Secure session storage.
- Proper logout.
- Auto logout on expiration.
- Route protection.
- No dashboard content should render before authentication.
- No authentication flashing.
- Clean middleware protection.

---

# 3. Database Connection

The previous project already contains a working database connection.

Do NOT create another database architecture.

Instead:

- Audit the previous implementation.
- Reuse the existing connection if it is stable.
- Unify the current project around that connection.
- Ensure the Admin Dashboard performs full CRUD through the database.

The current project appears disconnected from the existing local MariaDB/phpMyAdmin setup.

Reconnect it correctly instead of rebuilding everything.

---

# 4. Local Media Management

Do NOT introduce Firebase Storage, S3, Supabase Storage, Cloudinary, or any cloud storage layer.

This project intentionally uses local server storage.

The hosting has sufficient disk space and the project is relatively small.

Store uploaded media under:

public/uploads/

Example:

uploads/

    blog/
        article-slug/
            hero.webp
            gallery-1.webp
            gallery-2.webp

    services/

    brands/

    homepage/

    ui/

Requirements:

- Automatically create folders.
- Automatically rename files safely.
- Automatically delete replaced images.
- Automatically delete article images when deleting an article.
- Prevent orphaned files.
- Keep storage organized.

---

# 5. Blog CMS

Redesign the entire Blog experience.

Blog Listing:

- Magazine layout.
- Featured article.
- Categories.
- Search.
- Reading time.
- Publish date.
- Pagination.
- Beautiful hover animations.
- Skeleton loading.
- Empty states.

Single Article:

- Hero image.
- Premium typography.
- Sticky progress indicator.
- Table of contents.
- Share buttons.
- Related articles.
- Previous / Next navigation.
- CTA.
- Responsive images.
- Beautiful reading experience.

Everything should be managed from the Dashboard.

---

# 6. Automatic SEO

The website should generate SEO automatically.

Every page and article should support:

- SEO Title
- SEO Description
- Canonical URL
- Slug
- Open Graph
- Twitter Cards
- JSON-LD
- Article Schema
- Breadcrumb Schema
- Dynamic Metadata
- Sitemap updates

Everything editable from the Dashboard.

No hardcoded SEO.

---

# 7. Full Website CMS

Every editable part of the website should become CMS-driven.

Including:

- Hero
- Services
- Tire Brands
- Coverage Areas
- Testimonials
- FAQs
- Contact Information
- Homepage Sections
- Blog
- SEO Settings

No hardcoded content.

Future content updates should require zero code changes.

---

# 8. Tire Brands Section

The current Tire Brands section feels like placeholders.

Redesign it into a premium automotive showcase.

Use official manufacturer logos.

Each brand should support:

- Logo
- Name
- Country
- Description
- Hover animation
- Smooth grayscale-to-color transition

Managed entirely from the Dashboard.

Future brands can be added without code.

---

# 9. Dashboard Permissions

The Dashboard should become the control center.

I need full CRUD capability for all website content.

I should be able to:

- Create
- Edit
- Delete
- Hide
- Publish
- Reorder

without touching the codebase.

---

# 10. Public Folder Organization

Clean and organize the public directory.

Instead of everything inside:

public/

Create a proper structure:

public/

    uploads/

        blog/

        brands/

        services/

        homepage/

    images/

    icons/

    ui/

No random files.

Everything categorized.

---

# 11. UI & Motion Polish

Add premium micro-interactions throughout the site.

Focus on:

- Card hover effects.
- Smooth transitions.
- Reveal animations.
- Image zoom.
- Better loading transitions.
- Section animations.
- Better button interactions.

Keep everything lightweight and GPU accelerated.

No heavy animation libraries.

---

# 12. Performance

Maintain excellent performance.

Goals:

- High Lighthouse score.
- Fast LCP.
- Minimal CLS.
- Optimized bundle.
- Optimized images.
- Proper lazy loading.
- Proper caching.

---

# 13. Final Engineering Audit

When everything is complete:

Produce a detailed engineering report including:

- Files removed.
- Components merged.
- Dead code removed.
- Dependencies removed.
- Dashboard improvements.
- Database improvements.
- SEO improvements.
- Performance improvements.
- Remaining technical debt.

Do not stop at implementing features.

Audit the entire project like a senior software architect and leave the codebase cleaner, simpler, faster, easier to maintain, and fully production-ready.