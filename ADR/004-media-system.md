# ADR 004: Media System & Animations

**Decision:**
Retain MP4 animated icons and Hero frames, but implement strict performance (`IntersectionObserver`) and accessibility (`prefers-reduced-motion`) optimizations.

**Context:**
Autoplaying multiple MP4s kills mobile battery and performance scores, and motion can trigger accessibility issues.

**Alternatives:**
- Replace with SVGs (Degrades the premium aesthetic).
- Use Lottie JSON (Requires format conversion).

**Why this approach was selected:**
Maintains the premium "wow" factor without sacrificing Core Web Vitals or alienating users with vestibular disorders.

**Tradeoffs:**
Requires custom React hooks to manage video playback state manually.
