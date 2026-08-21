import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { ReviewActions } from '@/components/admin/review-actions'

export const dynamic = 'force-dynamic'

export default async function ReviewsPage() {
  let reviews: any[] = []
  try {
    reviews = await db.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.warn("DB offline, falling back to empty state.")
  }

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">التقييمات</h1>
          <p className="text-muted-foreground mt-1">
            إدارة تقييمات العملاء والتحكم في نشرها على الموقع.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>التقييمات الواردة</CardTitle>
          <CardDescription>التقييمات المكتوبة بواسطة الزوار تحتاج إلى موافقة لتظهر في الموقع.</CardDescription>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              لا توجد تقييمات حالياً.
            </div>
          ) : (
            <div className="divide-y">
              {reviews.map((rev: any) => (
                <div key={rev.id} className="py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{rev.clientName}</h3>
                        <Badge variant={rev.isVisible ? 'default' : 'secondary'}>
                          {rev.isVisible ? 'منشور' : 'بانتظار الموافقة'}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`size-3 ${i < rev.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                    
                    <ReviewActions review={rev} />
                  </div>
                  
                  <p className="text-muted-foreground text-sm bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">
                    "{rev.text}"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(rev.createdAt).toLocaleString('ar-SA')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
