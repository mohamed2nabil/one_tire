أيوه، الصورة عندي واضحة جدًا. **المشكلة مش مجرد WebP**؛ عندك في ONE TIRE مجموعة مشاكل مترابطة: Performance + Animation Assets + Branding + Technical SEO + Indexing + Structured Data + Favicon + 404 + Search Console.

ومن الصور، أهم نقطة لفتت نظري هي أن الصفحة بتسحب **عدد ضخم من صور الـ animation frames** مثل:

`Vehicle_driving_forward_smoothly_1080p_202.../frame_0...jpg`

وده ظاهر في تقرير PageSpeed كاستهلاك كبير جدًا للـ cache حوالي **10 MB**. لذلك تحويل كل الصور إلى WebP وحده **مش هو الحل الصحيح**.

كمان عندك حاليًا Mobile تقريبًا:

* **Performance: 85**
* FCP: **2.0s**
* LCP: **3.4s** ← أهم حاجة نشتغل عليها
* CLS: **0**
* TBT: **20ms** ← ممتاز
* Speed Index: **5.8s**
* Desktop الأداء أفضل بكثير، وده يؤكد إن المشكلة الأساسية في **حجم الـ assets وطريقة تحميلها على الموبايل**.

والـ Search Console عندك بالفعل فيه sitemap ناجح، لكن ما زال عندك مشاكل في الفهرسة، وفيه resource 404 واضح:
`/insights/script.js`

كمان Google تؤكد أن الـ sitemap مجرد إشارة لا تضمن الفهرسة، وأن الـ canonical والـ robots/noindex وإمكانية وصول Googlebot للمحتوى يجب فحصها بشكل مستقل. ([Google for Developers][1])

## الخطة التي أنصحك تنفذها بـ Antigravity

أنا **مش هخلي Antigravity يبدأ يعدّل عشوائيًا**. نخليه يشتغل على مراحل، وكل مرحلة لها اختبار + خطة بديلة.

### المرحلة 0 — Audit قبل أي تعديل

أول أمر لـ Antigravity:

1. يقرأ المشروع بالكامل.
2. يقرأ `Seo.md` ويعتبره **المصدر الأساسي للكلمات المفتاحية**.
3. يفحص:

   * `app/`
   * `components/`
   * `public/`
   * `next.config.*`
   * `layout.tsx`
   * metadata
   * sitemap
   * robots
   * structured data
   * favicon
   * جميع الصور والفيديوهات
   * GSAP
   * animated icons
   * أي `<img>` عادي
   * أي GIF/APNG
   * أي frame-by-frame animation
   * أي ملفات JavaScript غير مستخدمة
4. يعمل inventory للـ assets:

   * اسم الملف
   * الحجم
   * النوع
   * أين يستخدم
   * هل Above the Fold؟
   * هل يحتاج animation؟
   * هل يمكن استبداله بـ SVG/CSS/video؟
5. **ممنوع تعديل الملفات في هذه المرحلة.**

وفي النهاية يخرج تقرير:

`AUDIT_REPORT.md`

فيه المشاكل + الأولوية + الحل المقترح + Backup لكل حل.

---

# 1. مشكلة الـ Animation — دي الأولوية الأولى

من الصور واضح أن عندك animation مبني على **صور frames كثيرة**.

وده هو السبب الأكبر في المشكلة.

بدل:

```text
frame_001.jpg
frame_002.jpg
frame_003.jpg
...
frame_100.jpg
...
```

الأفضل:

```text
hero-animation.webm
hero-animation.mp4
hero-poster.webp
```

### الحل الأساسي

نحوّل الـ frame sequence إلى **فيديو WebM/MP4**.

والـ browser يشغل فيديو واحد بدل تحميل عشرات/مئات الصور.

مثلاً:

```html
<video
  autoplay
  muted
  loop
  playsinline
  poster="/images/hero-poster.webp"
>
  <source src="/video/hero-animation.webm" type="video/webm" />
  <source src="/video/hero-animation.mp4" type="video/mp4" />
</video>
```

### Backup

لو animation معين **لازم يكون frame-accurate** ويتحكم فيه GSAP:

* لا نستخدم كل الصور الأصلية.
* نعمل نسخة compressed.
* نقلل resolution للموبايل.
* نستخدم Canvas أو optimized frame sequence.
* نحمل frames فقط عند الحاجة.

لكن **الخيار الأول عندي هو Video**.

---

# 2. Animated Icons

دي نقطة منفصلة.

لو الـ animated icons عندك GIF:

**ممنوع نسيبها GIF.**

نحولها حسب الحالة إلى:

### الأفضل

**SVG + CSS animation**

لو animation بسيط:

```text
SVG
+
transform
+
opacity
+
scale
```

ده أخف بكثير من صورة animated.

### لو animation معقد

نقيم:

* Lottie
* SVG animation
* CSS
* static SVG

لكن مش هحط Lottie في كل حاجة لمجرد أنها Animated؛ لأننا هدفنا **تقليل JavaScript** مش زيادة JS.

---

# 3. لا نحول كل الصور إلى WebP يدويًا

دي نقطة مهمة جدًا.

أنا **معترض على فكرة**:

> نفتح public ونحوّل كل JPG/PNG إلى WebP يدويًا.

لأن Next.js عندك قادر يعمل image optimization تلقائيًا باستخدام `next/image`، ويقدر يقدم WebP/AVIF حسب دعم المتصفح. ([Next.js][2])

نستخدم:

```tsx
import Image from "next/image";
```

بدل:

```html
<img src="..." />
```

للصور المناسبة.

ونضبط:

```js
images: {
  formats: ['image/webp'],
}
```

وممكن ندرس AVIF بعد قياس النتائج، لكن **مش هنضيف AVIF لمجرد الإضافة**.

Next.js نفسه يوضح أن الصور المتحركة قد ترجع للصيغة الأصلية، ولذلك تحويل animation frames إلى WebP ليس علاجًا للمشكلة الأساسية. ([Next.js][2])

---

# 4. Hero Image

الـ Hero عندك هو أهم عنصر في الصفحة.

والـ PageSpeed أعطاك:

**LCP = 3.4s**

لذلك نعمل:

### Desktop

Hero optimized asset.

### Mobile

Hero مختلف وأخف.

مثلاً:

```text
hero-desktop.webp
hero-mobile.webp
```

ولا نحمل صورة Desktop ضخمة على شاشة موبايل.

ونستخدم:

```tsx
<Image
  src={hero}
  fill
  priority
  sizes="100vw"
  alt="..."
/>
```

أو في Next.js الحديث نستخدم `preload` حسب حالة الـ LCP.

الـ `sizes` مهم جدًا لأن عدم تحديده مع `fill` قد يؤدي إلى تنزيل صورة أكبر من اللازم. ([Next.js][2])

---

# 5. Lazy Loading

نعمل تقسيم واضح:

### Above the fold

تحميل فوري:

* Hero
* Logo
* critical fonts
* أول عناصر navigation

### Below the fold

Lazy:

* services images
* testimonials
* gallery
* secondary animations
* videos
* decorative assets

يعني **مش كل الصفحة تتحمل عند أول فتح**.

---

# 6. Fonts

نفحص الخطوط.

لو عندك:

```text
woff
woff2
ttf
otf
```

نحتفظ فقط بما يحتاجه الموقع.

ونستخدم:

```text
WOFF2
```

ونمنع تحميل weights غير مستخدمة.

مثلاً لو عندنا:

```text
400
500
600
700
800
900
```

والموقع فعليًا يستخدم:

```text
400
700
```

نحذف الباقي من الـ loading path.

---

# 7. JavaScript

PageSpeed عندك ظهر فيه:

**Legacy JavaScript — 13 KiB**

وده مش أكبر مشكلة، لكن نصلحه بعد الـ assets.

Antigravity يفحص:

* polyfills
* unused dependencies
* client components
* GSAP imports
* icon libraries
* duplicate packages
* unnecessary hydration

والأهم:

### لا نحول الصفحة كلها إلى Client Component

نخلي:

```text
Server Components
```

هي الافتراضية.

ونستخدم:

```text
"use client"
```

فقط حيث نحتاج interaction فعلي.

---

# 8. GSAP

بما إن الموقع cinematic وGSAP جزء من التصميم، **مش هنشيله**.

لكن:

* لا نشغل GSAP لكل عنصر.
* لا نعمل animation على العناصر المخفية.
* نستخدم `ScrollTrigger` فقط عند الحاجة.
* نعمل cleanup.
* نوقف animations غير الضرورية على mobile.
* نستخدم `prefers-reduced-motion`.
* لا نخلي animation تمنع LCP.

يعني نحافظ على شكل الموقع، لكن نقلل تكلفة تشغيله.

---

# 9. مشكلة 404

دي لازم تتصلح فورًا.

Search Console أظهر:

```text
Failed to load resource:
404 Not Found

/insights/script.js
```

Antigravity يبحث:

```text
insights/script.js
```

في:

* source
* layout
* components
* scripts
* analytics
* metadata
* third-party integrations

ثم يحدد:

**مين بيطلب الملف؟ وليه؟**

بعدها إما:

1. نصلح المسار.
2. نحذف الاستدعاء إذا أصبح dead code.
3. نعيد إنشاء الملف إذا كان مطلوبًا.

**ممنوع نعمل 200 redirect لمجرد إسكات الخطأ.**

---

# 10. Favicon

دي عندك مشكلة واضحة.

نحتاج:

```text
favicon.ico
icon.png
apple-icon.png
```

والأهم أن الـ favicon يكون:

* مربع
* ثابت URL
* قابل للـ crawl
* أكبر من 48×48 عمليًا
* يمثل ONE TIRE

Google توضح أن وجود favicon **لا يضمن ظهوره فورًا**، لأن Google تحتاج إلى إعادة الزحف ومعالجة التغيير. ([Google for Developers][3])

### والأهم

نختبر:

```text
https://one-tire.com/favicon.ico
```

أو المسار المستخدم فعليًا.

لازم يرجع:

```text
200 OK
```

مش 404.

---

# 11. اسم الموقع في Google

دي نقطة مختلفة عن `<title>`.

أنت عاوز:

### عربي

**وان تاير**

وليس:

**تواير**

وفي الإنجليزية:

**ONE TIRE**

نعمل `WebSite` structured data على الصفحة الرئيسية:

```text
name = وان تاير
alternateName = ONE TIRE
url = https://one-tire.com/
```

Google توضح أن `WebSite` structured data على الصفحة الرئيسية هي أهم إشارة لتحديد Site Name، مع ضرورة استخدام الاسم بشكل متسق داخل الصفحة. ([Google for Developers][4])

### مهم جدًا

هنعمل Search/Replace Audit كامل للكود عن:

```text
تواير
```

ونراجع:

* title
* description
* headings
* footer
* schema
* JSON-LD
* OpenGraph
* aria labels
* alt
* navigation
* metadata
* structured data
* sitemap
* code comments لو كانت تدخل في output

والاستبدال الصحيح:

```text
وان تاير
```

**لكن مش هنغير كلمة "تواير" إلى "وان تاير" بشكل أعمى داخل المحتوى العربي.**

لو المقصود اسم البراند → **وان تاير**.

لو كلمة عامة مثل "إطارات" → نستخدم **إطارات**.

وده مهم جدًا للـ SEO.

---

# 12. Review / Stars

أنت عندك في الموقع:

**4.9/5**

و:

**أكثر من 150 تقييم**

لكن Google لا تعرض النجوم في نتائج البحث.

هنا لازم نفرق بين:

### وجود النجوم في الموقع

و

### أهلية Google لإظهار Review Rich Result

Google لديها شروط صارمة للـ Review/AggregateRating، ولا يكفي أن نكتب:

```json
"ratingValue": 4.9
```

وخلاص.

الـ rating/reviews يجب أن تكون حقيقية، مرئية للمستخدم، ومطابقة للـ structured data. كما أن Google لا تضمن ظهور الـ rich result حتى مع markup صحيح. ([Google for Developers][5])

لذلك Antigravity يعمل:

```text
Review / AggregateRating audit
```

ويحدد هل الـ schema الحالي:

* صحيح؟
* موجود؟
* متوافق مع المحتوى المرئي؟
* نوع الـ schema مناسب؟
* عدد التقييمات صحيح؟
* المصدر حقيقي؟

**ممنوع اختراع Review schema للحصول على النجوم.**

---

# 13. SEO — Seo.md

دي عندي أهم نقطة في الخطة.

الـ `Seo.md` سيكون **SEO Source of Truth**.

Antigravity لازم يقرأه قبل تعديل الـ metadata.

ويستخرج منه:

```text
Arabic keywords
English keywords
Primary keywords
Secondary keywords
Local keywords
Service keywords
Search intent
Suggested titles
Suggested descriptions
```

ثم يعمل Mapping:

| الصفحة   | Primary KW | Secondary KW | Title | Description | H1    |
| -------- | ---------- | ------------ | ----- | ----------- | ----- |
| Home     | من Seo.md  | من Seo.md    | محسّن | محسّن       | محسّن |
| Services | من Seo.md  | ...          | ...   | ...         | ...   |
| About    | ...        | ...          | ...   | ...         | ...   |
| Contact  | ...        | ...          | ...   | ...         | ...   |

**مش هنحط كل الكلمات في الصفحة الرئيسية.**

ده Keyword Stuffing ومش المطلوب.

---

# 14. Arabic / English SEO

بما إن الموقع عربي + English، نراجع:

```text
lang
dir
canonical
hreflang
alternate
metadata
OpenGraph
sitemap
```

ويكون لكل نسخة:

```text
Arabic
English
```

بشكل واضح.

ولو الـ URLs عندك ليست localized حاليًا، **ممنوع نغير الـ URL architecture عشوائيًا** لأن ده ممكن يعمل مشاكل indexing جديدة.

الأولوية:

> إصلاح architecture الحالية أولًا، ثم نقرر هل نحتاج URL localization أم لا.

---

# 15. Sitemap

الصورة عندك تقول:

```text
sitemap.xml
Successful
9 pages
```

وده جيد.

لكن Antigravity يعمل validation كامل:

```text
/sitemap.xml
```

ويضمن أن كل URL فيه:

* 200
* indexable
* canonical صحيح
* ليس redirect
* ليس noindex
* ليس duplicate

Google توصي بأن يحتوي sitemap على الـ canonical URLs التي تريد ظهورها، وأن تكون absolute URLs. ([Google for Developers][1])

---

# 16. robots.txt

نفحص:

```text
/robots.txt
```

ويكون فيه sitemap بشكل صحيح.

لكن مهم جدًا:

**لا نستخدم robots.txt لإخفاء صفحات نريد منع فهرستها.**

Google توضح أن `robots.txt` يمنع crawling، لكنه ليس الطريقة الصحيحة لمنع ظهور URL في Search؛ لهذا نستخدم `noindex` عندما يكون الهدف منع الفهرسة. ([Google for Developers][6])

---

# 17. Indexing Audit

نعمل قائمة بكل URLs الموجودة.

مثلاً:

```text
/
 /services
 /about
 /contact
 ...
```

لكل URL نتحقق:

```text
HTTP 200?
Indexable?
Canonical?
Noindex?
Robots allowed?
In sitemap?
Internal links?
Unique title?
Unique description?
Unique H1?
Useful content?
```

وبعدها نصلح:

### Discovered but not indexed

### Crawled but not indexed

### Duplicate

### Alternate page

### Soft 404

### Redirect

كل واحدة لها سبب مختلف، ومش هنحلهم كلهم بنفس الطريقة.

---

# 18. Structured Data Architecture

نعمل Schema نظيف.

الـ Home ممكن يكون فيه حسب البيانات الحقيقية:

```text
WebSite
Organization
LocalBusiness
BreadcrumbList
```

والصفحات الأخرى حسب طبيعتها.

وممنوع نحط 7 أنواع Schema عشوائيًا.

الهدف:

> Google تفهم ONE TIRE ككيان تجاري حقيقي، والخدمات، والموقع، والمراجعات، والمحتوى.

---

# 19. Image SEO

مش بس compression.

كل صورة مهمة:

```text
alt
width
height
sizes
loading
```

مثلاً بدل:

```text
alt="image"
```

يكون:

```text
alt="خدمة تغيير إطارات متنقلة من وان تاير"
```

لكن **من غير حشو كلمات مفتاحية**.

Next.js يوضح أن `alt` مفيد لمحركات البحث وإمكانية الوصول، وأن تحديد أبعاد الصورة يساعد في منع Layout Shift. ([Next.js][2])

---

# 20. Video SEO / Search Console

عندك في Search Console:

**Video indexing**

```text
0 indexed
1 not indexed
```

وده منطقي جدًا لو الفيديو عندك مجرد Hero background وليس فيديو صفحة محتوى.

Antigravity يفحص:

* هل الفيديو هو main content؟
* هل له thumbnail؟
* هل له title/description؟
* هل Google قادر على اكتشافه؟
* هل هو مجرد background؟

لو مجرد Hero background:

**لا نحاول إجبار Google على اعتباره Video SEO content.**

لو عندك فيديو حقيقي له قيمة بحثية:

نجهزه كـ VideoObject بشكل صحيح.

Google تدعم video sitemap/extensions عندما يكون عندك محتوى فيديو فعلي. ([Google for Developers][7])

---

# 21. Cache / CDN

نضبط caching للـ static assets:

```text
images
fonts
video
svg
js
css
```

خصوصًا assets التي لها hash/version.

لكن **لا نضع cache طويل بشكل أعمى على HTML**.

والـ animation video تحديدًا يجب أن يكون قابلًا للكاش بشكل ممتاز.

---

# 22. Backup Strategy

دي مهمة جدًا لأنك قلت:

> دائمًا عندنا خطة بديلة.

أنا هخلي Antigravity يطبق قاعدة:

### لكل تعديل كبير:

```text
BEFORE
↓
Backup
↓
Change
↓
Build
↓
Test
↓
Performance
↓
SEO
↓
Deploy
```

ولو فشل:

```text
Rollback
```

---

# ترتيب التنفيذ

أنا لا أنصح تعمل كل ده مرة واحدة.

الترتيب الصحيح:

### Phase 1 — Safety

* [ ] Git checkpoint
* [ ] Audit
* [ ] Seo.md analysis
* [ ] Asset inventory
* [ ] SEO inventory
* [ ] URL inventory

### Phase 2 — Performance

* [ ] Replace frame animation with video
* [ ] Optimize animated icons
* [ ] Next/Image
* [ ] Responsive images
* [ ] Lazy loading
* [ ] Hero LCP
* [ ] Fonts
* [ ] GSAP optimization
* [ ] JS cleanup
* [ ] Cache headers

### Phase 3 — Technical SEO

* [ ] Remove "تواير"
* [ ] Arabic brand = "وان تاير"
* [ ] English = "ONE TIRE"
* [ ] titles
* [ ] descriptions
* [ ] H1
* [ ] canonical
* [ ] hreflang
* [ ] robots
* [ ] sitemap
* [ ] internal links

### Phase 4 — Google

* [ ] favicon
* [ ] WebSite schema
* [ ] Organization/LocalBusiness
* [ ] Review/AggregateRating validation
* [ ] Breadcrumbs
* [ ] 404 `/insights/script.js`
* [ ] video inspection
* [ ] Search Console indexing issues

### Phase 5 — Validation

* [ ] Production build
* [ ] Lighthouse Mobile
* [ ] Lighthouse Desktop
* [ ] Rich Results Test
* [ ] Schema validation
* [ ] sitemap validation
* [ ] robots validation
* [ ] URL Inspection
* [ ] 404 crawl
* [ ] Core Web Vitals

---

# الأهداف التي نريد الوصول لها

مش هنقول "عايز 100 وخلاص".

نستهدف:

| Metric             |      الحالي |                            الهدف |
| ------------------ | ----------: | -------------------------------: |
| Mobile Performance |      **85** |                   **90+** ثم 95+ |
| FCP                |        2.0s |                       **< 1.8s** |
| LCP                |        3.4s |                       **< 2.5s** |
| CLS                |           0 |                        **≤ 0.1** |
| TBT                |        20ms |                      **< 200ms** |
| Speed Index        |        5.8s |                       **< 3.4s** |
| Animation payload  | ~10MB class |                    **أقل بكثير** |
| 404 resources      |          1+ |                            **0** |
| Sitemap            |  successful |      **successful + clean URLs** |
| Favicon            |    غير ظاهر |                **قابل للاكتشاف** |
| Site name          |   غير مضبوط |                     **وان تاير** |
| Review schema      |   غير محسوم | **valid إن كانت البيانات مؤهلة** |

---

# والأهم: لا نضحي بشكل الموقع

أنا **مش عايز Antigravity يعمل Performance Optimization بطريقة تخرب التصميم**.

خصوصًا أن الموقع الحالي له طابع cinematic واضح.

القاعدة:

> **نقلل تكلفة التنفيذ، وليس جودة التجربة.**

يعني:

**❌ لا نحذف الـ Hero animation.**
**❌ لا نحذف الـ GSAP بالكامل.**
**❌ لا نحول كل الصور يدويًا إلى WebP.**
**❌ لا نضع lazy loading للـ Hero.**
**❌ لا نضيف Schema وهمي للنجوم.**
**❌ لا نغير URLs بدون سبب.**

لكن:

**✅ Frame sequence → Video**
**✅ Animated icons → SVG/CSS حيثما أمكن**
**✅ Next/Image للصور**
**✅ Responsive assets**
**✅ Lazy load للـ below-the-fold**
**✅ SEO مبني على `Seo.md`**
**✅ "وان تاير" كاسم عربي**
**✅ "ONE TIRE" كاسم إنجليزي**
**✅ إزالة "تواير" كاسم للبراند**
**✅ إصلاح favicon**
**✅ إصلاح 404**
**✅ إصلاح indexing architecture**
**✅ Schema حقيقي ومطابق للمحتوى**

### ملاحظة أخيرة مهمة جدًا

أنا **لا أرى ملف `Seo.md` نفسه ضمن الملفات المرفوعة في هذه الرسالة**؛ الصور موجودة وواضحة، لكن الملف النصي نفسه غير ظاهر عندي. لذلك في خطة Antigravity فوق جعلت `Seo.md` **إلزامي القراءة قبل أي تعديل SEO** بدل ما أخمن الكلمات المفتاحية.

ولو هنفذ الخطة فعليًا، **أول حاجة يعملها Antigravity هي Audit + قراءة `Seo.md`، وليس تعديل الكود مباشرة**. ده هيمنعنا من إننا نصلح مشكلة ونفتح 3 مشاكل SEO جديدة.

والأهم: Google نفسها تنبه أن إعادة الزحف بعد تغييرات الـ favicon/structured data/indexing قد تستغرق من أيام إلى أسابيع؛ لذلك بعد الإصلاح نعمل validation وRequest Indexing للصفحات المهمة، وليس إعادة الطلب بشكل عشوائي. ([Google for Developers][4])

لو عايز تستخدم الكلام ده كـ **Master Task لـ Antigravity**، أقدر أحوله لك في الرسالة التالية إلى Prompt تنفيذي واحد، مرتب بحيث Antigravity **يفحص المشروع → يكتب تقرير → ينفذ Phase 1 → يختبر → ينتقل للمرحلة التالية، مع Rollback Plan لكل مرحلة**.

[1]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=en&utm_source=chatgpt.com "Build and Submit a Sitemap | Google Search Central  |  Documentation  |  Google for Developers"
[2]: https://nextjs.org/docs/app/api-reference/components/image?utm_source=chatgpt.com "Components: Image Component | Next.js"
[3]: https://developers.google.com/search/docs/appearance/favicon-in-search?authuser=108&utm_source=chatgpt.com "Define Website Favicon for Search Results | Google Search Central  |  Documentation  |  Google for Developers"
[4]: https://developers.google.com/search/docs/appearance/site-names?hl=en&utm_source=chatgpt.com "Site Names in Google Search | Google Search Central  |  Documentation  |  Google for Developers"
[5]: https://developers.google.com/search/docs/appearance/structured-data/review-snippet?authuser=77&utm_source=chatgpt.com "Review Snippet (Review, AggregateRating) Structured Data | Google Search Central  |  Documentation  |  Google for Developers"
[6]: https://developers.google.com/search/docs/crawling-indexing/block-indexing?rd=1&visit_id=639173061565117540-1865991663&utm_source=chatgpt.com "Block Search Indexing with noindex | Google Search Central  |  Documentation  |  Google for Developers"
[7]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions?hl=en&utm_source=chatgpt.com "How to Combine Sitemap Extensions | Google Search Central  |  Documentation  |  Google for Developers"
