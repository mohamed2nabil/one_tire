import { Metadata } from 'next';
import { SiteNav } from '@/components/site/site-nav';
import { SiteFooter } from '@/components/site/site-footer';
import { Button, buttonVariants } from '@/components/ui/button';
import { Phone, CheckCircle, Clock, MapPin, Shield } from 'lucide-react';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'أسرع بنشر متنقل في السعودية | تغيير وإصلاح كفرات عند البيت 24/7',
  description: 'هل تبحث عن أقرب بنشر متنقل من موقعك؟ نقدم خدمة تبديل كفرات سيارات، ترصيص كفرات، وزن أذرعة، وإصلاح بنشر عند البيت أو على الطريق في الدمام، الخبر، الجبيل والمنطقة الشرقية.',
  keywords: [
    'بنشر متنقل', 'بنشري قريب مني', 'أقرب بنشر من موقعي', 'تبديل كفرات عند البيت', 
    'تغيير كفرات', 'كفرات سيارات', 'إصلاح بنشر', 'ترصيص كفرات', 'رقع كفر'
  ],
};

export default function BaansherMtagelPage() {
  return (
    <>
      <SiteNav locale="ar" />
      
      <main className="min-h-screen bg-background text-foreground pt-28 pb-16" dir="rtl">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_50%_-10rem,rgba(255,122,26,0.1),transparent)]" />
          <div className="container mx-auto max-w-4xl px-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Clock className="w-3.5 h-3.5" />
              خدمة طوارئ 24 ساعة
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-6xl text-balance">
              بنشر متنقل قريب منك <br />
              <span className="text-primary">إصلاح وتغيير الكفرات عند البيت</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              لا داعي للانتظار أو الذهاب إلى ورش ميكانيكا وصناعية السيارات. سيارتنا المتنقلة مجهزة بالكامل لتصلك أينما كنت لتقديم خدمات تبديل كفرات السيارات، رقع كفر، وترصيص الإطارات بأفضل الأسعار.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonVariants({ size: 'lg' })} h-14 rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform`}
              >
                <Phone className="w-5 h-5 ml-2" />
                اطلب بنشر متنقل الآن
              </a>
              <Link
                href="#services"
                className={`${buttonVariants({ variant: 'outline', size: 'lg' })} h-14 rounded-full px-8 text-base font-bold`}
              >
                استكشف خدمات الإطارات
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto max-w-5xl px-5">
            <h2 className="text-3xl font-bold text-center mb-12">لماذا تختار خدمة بنشر متنقل من وان تاير؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl border bg-card p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">الوصول خلال دقائق</h3>
                <p className="text-sm text-muted-foreground">
                  نحن ندرك أن تعطل الإطارات أمر طارئ، لذلك سياراتنا موزعة في المنطقة الشرقية لضمان سرعة الاستجابة.
                </p>
              </div>

              <div className="rounded-2xl border bg-card p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">خدمة عند البيت وعلى الطريق</h3>
                <p className="text-sm text-muted-foreground">
                  سواء كنت عند البيت أو تعطلت سيارتك على طريق سريع، نصلك ونقوم بكافة أعمال الصيانة في موقعك.
                </p>
              </div>

              <div className="rounded-2xl border bg-card p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">ضمان وجودة الإطارات</h3>
                <p className="text-sm text-muted-foreground">
                  نوفر كفرات سيارات أصلية من أفضل الماركات العالمية مع ضمان حقيقي على التركيب والترصيص.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section id="services" className="py-20">
          <div className="container mx-auto max-w-4xl px-5 space-y-12">
            <h2 className="text-3xl font-bold text-center">خدمات كفرات الإطارات المتنقلة الشاملة</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'تغيير وتبديل كفرات سيارات',
                  desc: 'توفير كفرات سيارات أصلية لجميع الموديلات وفك وتركيب الإطارات في موقعك دون الحاجة لزيارة الصناعية.'
                },
                {
                  title: 'رقع كفر وإصلاح بنشر',
                  desc: 'إصلاح سريع للثقوب بأحدث الطرق الآمنة التي تحافظ على سلامة الكفر وهيكل الإطار الداخلي.'
                },
                {
                  title: 'ترصيص كفرات متنقل وميزان كفرات',
                  desc: 'توازن مثالي للإطارات لمنع الاهتزازات أثناء القيادة وضمان توزيع الوزن بالتساوي.'
                },
                {
                  title: 'فحص ضغط الإطارات TPMS وزيوت',
                  desc: 'معايرة وبرمجة حساسات الكفرات والتأكد من سلامة قيادتك على الطرق السريعة.'
                }
              ].map((service, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-xl border bg-card">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto max-w-3xl px-5 space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">الأسئلة الشائعة حول بنشر متنقل</h2>
            <div className="space-y-4">
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <h4 className="font-bold text-base">كيف أطلب أقرب بنشر متنقل من موقعي؟</h4>
                <p className="text-sm text-muted-foreground">
                  كل ما عليك هو الضغط على زر الاتصال أو الواتساب، وسيقوم النظام بتحديد موقعك تلقائياً وإرسال أقرب سيارة خدمة مجهزة إليك.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <h4 className="font-bold text-base">هل تقدمون خدمة تبديل كفرات عند البيت في الدمام والخبر؟</h4>
                <p className="text-sm text-muted-foreground">
                  نعم، نغطي كافة أحياء الدمام والخبر والجبيل ونصلك عند البيت لتبديل وتغيير الكفرات مع توفير خدمة الترصيص السريعة.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <h4 className="font-bold text-base">ما هي أسعار عروض الكفرات لديكم؟</h4>
                <p className="text-sm text-muted-foreground">
                  نقدم أسعاراً منافسة جداً على كفرات السيارات في السعودية مع عروض مستمرة. يمكنك الاستفسار عن الماركات المتاحة وأسعارها مباشرة عبر الواتساب.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale="ar" />
    </>
  );
}
