# Changelog - Architecture Updates (Post Design Review)

## [Unreleased]
### Added
- **ADR Folder**: Introduced Architecture Decision Records (`ADR/001` through `ADR/006`) detailing Auth, Dashboard, DB, Media, Blog, and n8n decisions.
- **Role-Based Access Control (RBAC)**: Added `ADMIN`, `TECHNICIAN`, `MARKETING`, and `AUTHOR` roles to the Dashboard requirements.
- **Performance Optimizations**: Mandated `IntersectionObserver` and `prefers-reduced-motion` fallbacks for all MP4 icons and hero animations.
- **Webhook Security**: Mandated `x-n8n-api-key` validation for all n8n-facing API routes.

### Changed
- **Authentication Flow**: Replaced standard Firebase Client SDK strategy with a secure HTTP-only Session Cookie strategy (via Firebase Admin SDK) to ensure compatibility with Next.js Edge Middleware.
- **Migration Strategy**: completely reordered the migration phases to start with **Refactoring & Cleanup** (Phase 1) rather than blindly importing legacy code.
- **Reference Project Policy**: Strengthened rules to mandate searching both the current and previous project before creating new modules, prioritizing refactoring over rewriting.

### Removed
- **Direct Legacy Dashboard Copying**: Explicitly prohibited the "blind copy" approach for the dashboard transplant to prevent CSS conflicts and unused code bloat.
