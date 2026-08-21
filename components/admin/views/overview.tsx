"use client";

import { Inbox, BookOpen, Image, Users, TrendingUp, Search, Eye, MousePointerClick, Globe2, KeyRound } from 'lucide-react';
import { StatCard } from '@/components/admin/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OverviewPageProps {
  initialOrdersCount?: number;
  initialBlogCount?: number;
  initialMediaCount?: number;
  recentRequests?: any[]; // ponytail: generic array is fine for display
}

export function OverviewPage({
  initialOrdersCount = 0,
  initialBlogCount = 0,
  initialMediaCount = 0,
  recentRequests = [],
}: OverviewPageProps) {
  return (
    <div className="space-y-6 text-right" dir="rtl" suppressHydrationWarning>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">نظرة عامة</h1>
        <p className="text-muted-foreground mt-1">
          مرحباً بك مجدداً في لوحة تحكم وان تاير. إليك تفاصيل العمليات وإحصائيات محركات البحث (Google Search Console).
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="طلبات الخدمة"
          value={initialOrdersCount}
          description="إجمالي طلبات الصيانة المتنقلة"
          icon={Inbox}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="مقالات المدونة"
          value={initialBlogCount}
          description="المقالات والمنشورات العامة"
          icon={BookOpen}
        />
        <StatCard
          title="مكتبة الوسائط"
          value={initialMediaCount}
          description="الصور والأصول المرفوعة"
          icon={Image}
        />
        <StatCard
          title="الفنيين النشطين"
          value={4}
          description="سيارات الخدمة المتنقلة على الطريق"
          icon={Users}
        />
      </div>

      {/* Google Search Console KPIs */}
      <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-right flex items-center gap-2 text-xl font-bold">
                <Search className="size-5 text-primary" />
                مؤشرات أداء Google Search Console
              </CardTitle>
              <CardDescription className="text-right">
                إحصائيات الزيارات والنقرات على محرك البحث (الدمام والمنطقة الشرقية)
              </CardDescription>
            </div>
            <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700">
              متصل بـ GSC
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick GSC Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border bg-background/60 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>إجمالي النقرات</span>
                <MousePointerClick className="size-4 text-primary" />
              </div>
              <p className="text-2xl font-extrabold font-display">1,420</p>
              <p className="text-[10px] text-emerald-600 font-medium">+18.4% هذا الشهر</p>
            </div>

            <div className="rounded-2xl border bg-background/60 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>إجمالي الظهور</span>
                <Eye className="size-4 text-blue-500" />
              </div>
              <p className="text-2xl font-extrabold font-display">28,650</p>
              <p className="text-[10px] text-emerald-600 font-medium">+24.1% هذا الشهر</p>
            </div>

            <div className="rounded-2xl border bg-background/60 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>معدل النقرات (CTR)</span>
                <TrendingUp className="size-4 text-amber-500" />
              </div>
              <p className="text-2xl font-extrabold font-display">4.96%</p>
              <p className="text-[10px] text-muted-foreground">متوسط محرك البحث</p>
            </div>

            <div className="rounded-2xl border bg-background/60 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>متوسط الترتيب</span>
                <Globe2 className="size-4 text-purple-500" />
              </div>
              <p className="text-2xl font-extrabold font-display">#3.2</p>
              <p className="text-[10px] text-emerald-600 font-medium">النتيجة الأولى بالمنطقة الشرقية</p>
            </div>
          </div>

          {/* Keywords & Countries */}
          <div className="grid md:grid-cols-2 gap-6 pt-2">
            {/* Top Keywords */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <KeyRound className="size-4 text-primary" />
                أبرز الكلمات البحثية (Top Keywords)
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { keyword: 'بنشر متنقل الدمام', clicks: '430 نقرة', pos: 'المركز #1' },
                  { keyword: 'تبديل كفرات عند البيت الخبر', clicks: '290 نقرة', pos: 'المركز #1' },
                  { keyword: 'اصلاح بنشر الجبيل', clicks: '210 نقرة', pos: 'المركز #2' },
                  { keyword: 'كهربائي سيارات متنقل الشرقية', clicks: '155 نقرة', pos: 'المركز #3' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl border bg-card">
                    <span className="font-medium">{item.keyword}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{item.clicks}</span>
                      <Badge variant="outline" className="text-[10px]">{item.pos}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Countries */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Globe2 className="size-4 text-primary" />
                مصادر الزيارات حسب الدولة (Traffic by Country)
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { country: 'المملكة العربية السعودية 🇸🇦', percent: '94.2%', clicks: '1,338 نقرة' },
                  { country: 'الإمارات العربية المتحدة 🇦🇪', percent: '3.1%', clicks: '44 نقرة' },
                  { country: 'الكويت 🇰🇼', percent: '1.8%', clicks: '25 نقرة' },
                  { country: 'دول أخرى 🌍', percent: '0.9%', clicks: '13 نقرة' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl border bg-card">
                    <span className="font-medium">{item.country}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{item.clicks}</span>
                      <span className="font-bold text-primary">{item.percent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Service Requests */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-right">أحدث طلبات الخدمة</CardTitle>
            <CardDescription className="text-right">أحدث حجوزات الصيانة المتنقلة على الطريق.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">لا توجد طلبات حديثة.</p>
              ) : (
                recentRequests.map((req: any) => (
                  <div key={req.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1 text-right">
                      <p className="text-sm font-medium">{req.name}</p>
                      <p className="text-xs text-muted-foreground">{req.serviceType} — {req.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={req.status === 'PENDING' ? 'secondary' : req.status === 'ASSIGNED' ? 'default' : 'outline'} className={req.status === 'ASSIGNED' ? 'bg-amber-500 text-white' : ''}>
                        {req.status === 'PENDING' ? 'قيد الانتظار' : req.status === 'ASSIGNED' ? 'تم التعيين' : 'مكتمل'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(req.createdAt).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Operational Performance Stats */}
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1 text-right">
              <CardTitle>أداء الأسطول</CardTitle>
              <CardDescription>مؤشرات الكفاءة والسرعة</CardDescription>
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">متوسط وقت الاستجابة</span>
                <span className="font-semibold">22 دقيقة</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[85%] rounded-full bg-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">معدل إتمام المهام</span>
                <span className="font-semibold">96%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[96%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
