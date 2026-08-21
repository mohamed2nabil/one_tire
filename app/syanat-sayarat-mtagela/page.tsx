import { Metadata } from 'next';
import { SiteNav } from '@/components/site/site-nav';
import { SiteFooter } from '@/components/site/site-footer';
import { Button, buttonVariants } from '@/components/ui/button';
import { Phone, CheckCircle, Clock, MapPin, Shield } from 'lucide-react';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'ورشة صيانة سيارات متنقلة | تغيير زيت وسيفون وكهربائي متنقل 24H',
  description: 'أفضل ورشة صيانة سيارات متنقلة بالمنطقة الشرقية. نقدم خدمات تغيير زيت وسيفون، فحص كمبيوتر للسيارات، كهربائي سيارات متنقل، وتوفير سطحة لنقل السيارات في الدمام، الخبر والجبيل.',
  keywords: [
    'صيانة سيارات متنقلة', 'ورشة سيارات', 'ورشة ميكانيكا', 'تغيير زيت وسيفون', 
    'فحص كمبيوتر للسيارات', 'كهربائي سيارات', 'كهربائي سيارات متنقل', 'رقم سطحة'
  ],
};

export default function SyanatSayaratMtagelaPage() {
  return (
    <>
      <SiteNav locale="ar" />
      
      <main className="min-h-screen bg-background text-foreground pt-28 pb-16" dir="rtl">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_50%_-10rem,rgba(255,122,26,0.1),transparent)]" />
          <div className="container mx-auto max-w-4xl px-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Shield className="w-3.5 h-3.5" />
              صيانة متنقلة معتمدة وسريعة
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-6xl text-balance">
              صيانة سيارات متنقلة <br />
              <span className="text-primary">ميكانيكا وكهرباء وفحص كمبيوتر بموقعك</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              نوفر لك ورشة سيارات متنقلة متكاملة تصلك أينما كنت. نقوم بأعمال تغيير زيت وسيفون السيارة، فحص كمبيوتر، وصيانة البطاريات والكهرباء بأحدث الأجهزة والتقنيات دون عناء الذهاب للصناعية.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonVariants({ size: 'lg' })} h-14 rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform`}
              >
                <Phone className="w-5 h-5 ml-2" />
                اطلب ورشة متنقلة الآن
              </a>
              <Link
                href="#services"
                className={`${buttonVariants({ variant: 'outline', size: 'lg' })} h-14 rounded-full px-8 text-base font-bold`}
              >
                استكشف خدمات الصيانة
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto max-w-5xl px-5">
            <h2 className="text-3xl font-bold text-center mb-12">لماذا وان تاير لصيانة السيارات المتنقلة؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl border bg-card p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">مهندسون وفنيون خبراء</h3>
                <p className="text-sm text-muted-foreground">
                  فريقنا يضم ميكانيكيين وكهربائيين مؤهلين ولديهم خبرة واسعة في تشخيص وصيانة كافة أعطال السيارات.
                </p>
              </div>

              <div className="rounded-2xl border bg-card p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">توفير الوقت والجهد</h3>
                <p className="text-sm text-muted-foreground">
                  ننهي أعمال الصيانة وتغيير الزيت وسيفون السيارة أثناء وجودك في مكتبك أو منزلك بكل راحة.
                </p>
              </div>

              <div className="rounded-2xl border bg-card p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">تغطية واسعة وسريعة</h3>
                <p className="text-sm text-muted-foreground">
                  نغطي مدن الدمام، الخبر، والجبيل بالكامل لضمان وصول سيارة الخدمة لموقعك في أسرع وقت.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section id="services" className="py-20">
          <div className="container mx-auto max-w-4xl px-5 space-y-12">
            <h2 className="text-3xl font-bold text-center">خدمات ورشة الصيانة المتنقلة</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'تغيير زيت وسيفون السيارة',
                  desc: 'تغيير زيت المحرك وفلتر الزيت (السيفون) بموقعك بزيوت أصلية 100% ومطابقة لمواصفات الشركة المصنعة.'
                },
                {
                  title: 'فحص كمبيوتر للسيارات وكشف أعطال',
                  desc: 'استخدام أجهزة فحص متطورة لكشف كافة أعطال الأنظمة الإلكترونية والحساسات بالسيارة وتقديم تقرير متكامل.'
                },
                {
                  title: 'كهربائي سيارات متنقل وصيانة بطاريات',
                  desc: 'فحص الدينامو، شحن وإصلاح البطاريات أو استبدالها ببطاريات جديدة أصلية مع الضمان عند البيت.'
                },
                {
                  title: 'خدمات الطوارئ وسحب سطحة',
                  desc: 'نوفر حلولاً طارئة لحالات التعطل الكامل، وفي حال تعذر الإصلاح في الموقع نساعدك في توفير سطحة لنقل سيارتك بأمان.'
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
            <h2 className="text-3xl font-bold text-center mb-8">الأسئلة الشائعة حول صيانة السيارات المتنقلة</h2>
            <div className="space-y-4">
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <h4 className="font-bold text-base">هل الخدمة تشمل فحص كمبيوتر للسيارات بموقعي؟</h4>
                <p className="text-sm text-muted-foreground">
                  نعم، سياراتنا المتنقلة مجهزة بأحدث أجهزة الفحص بالكمبيوتر لتشخيص الأعطال مباشرة أمام منزلك أو مكان عملك.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <h4 className="font-bold text-base">ماذا تعني خدمة تغيير زيت وسيفون عند البيت؟</h4>
                <p className="text-sm text-muted-foreground">
                  السيفون هو فلتر الزيت، ونحن نقوم بتفريغ الزيت القديم واستبداله بآخر جديد وتركيب فلتر زيت أصلي بموقعك دون إحداث أي فوضى أو تسريب للزيوت.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <h4 className="font-bold text-base">ما هي المناطق التي تغطيها ورشة السيارات المتنقلة؟</h4>
                <p className="text-sm text-muted-foreground">
                  نقدم خدماتنا في الدمام، الخبر، الجبيل، والعديد من المناطق المجاورة بالمنطقة الشرقية طوال أيام الأسبوع.
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
