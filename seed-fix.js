const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fallbackPosts = [
  {
    type: 'ARTICLE',
    slug: 'tire-change-timing',
    coverImage: '/images/blog/blog-tire-care.png',
    tags: ['العناية بالإطارات'],
    title: 'متى يجب تغيير إطارات سيارتك؟ 5 علامات لا تتجاهلها',
    content: '<p>تعتبر الإطارات من أهم أجزاء السيارة التي تؤثر على سلامتك وسلامة الركاب...</p>',
    status: 'PUBLISHED',
  },
  {
    type: 'ARTICLE',
    slug: 'tpms-guide',
    coverImage: '/images/blog/blog-tpms.png',
    tags: ['حساسات الضغط'],
    title: 'كل ما تحتاج معرفته عن نظام مراقبة ضغط الإطارات TPMS',
    content: '<p>نظام TPMS هو نظام أساسي لمراقبة ضغط الهواء في الإطارات وتنبيه السائق في حالة وجود تسرب...</p>',
    status: 'PUBLISHED',
  },
  {
    type: 'ARTICLE',
    slug: 'battery-summer-care',
    coverImage: '/images/blog/blog-battery.png',
    tags: ['البطاريات'],
    title: 'كيف تطيل عمر بطارية سيارتك في حرارة الصيف؟',
    content: '<p>فصل الصيف والحرارة الشديدة يؤثران بشكل كبير على عمر وكفاءة بطارية السيارة...</p>',
    status: 'PUBLISHED',
  },
];

const fallbackReviews = [
  {
    clientName: 'عبدالله القحطاني',
    city: 'الدمام',
    text: 'انفجر إطاري على طريق سريع واتصلت بهم، وصلوا خلال ربع ساعة وغيّروا الإطار باحترافية. خدمة تستحق الثقة.',
    isVisible: true,
    order: 1
  },
  {
    clientName: 'سارة العتيبي',
    city: 'الخبر',
    text: 'أفضل تجربة، جاء الفني إلى موقف عملي وغيّر الإطارات وأنا أعمل. أسعار واضحة ومنتجات أصلية.',
    isVisible: true,
    order: 2
  },
  {
    clientName: 'فهد الدوسري',
    city: 'الجبيل',
    text: 'برمجوا حساسات الضغط وأصلحوا البطارية في نفس الزيارة. سرعة واحترافية عالية، أنصح بهم بشدة.',
    isVisible: true,
    order: 3
  },
];

async function main() {
  console.log('Publishing draft content items...');
  await prisma.contentItem.updateMany({
    where: { status: 'DRAFT' },
    data: { status: 'PUBLISHED' }
  });

  const existingPosts = await prisma.contentItem.count({ where: { type: 'ARTICLE' } });
  if (existingPosts === 0) {
    console.log('Seeding fallback posts...');
    for (const post of fallbackPosts) {
      await prisma.contentItem.create({ data: post });
    }
  }

  const existingReviews = await prisma.testimonial.count();
  if (existingReviews === 0) {
    console.log('Seeding fallback testimonials...');
    for (const review of fallbackReviews) {
      await prisma.testimonial.create({ data: review });
    }
  }

  console.log('Done!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
