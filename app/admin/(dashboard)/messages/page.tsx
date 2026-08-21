import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageActions } from '@/components/admin/message-actions'

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
  let messages: any[] = []
  try {
    messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.warn("DB offline, falling back to empty state.")
  }

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">الرسائل</h1>
          <p className="text-muted-foreground mt-1">
            عرض رسائل العملاء القادمة من نموذج التواصل.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>صندوق الوارد</CardTitle>
          <CardDescription>الرسائل مرتبة من الأحدث للأقدم.</CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              لا توجد رسائل حالياً.
            </div>
          ) : (
            <div className="divide-y">
              {messages.map((msg: any) => (
                <div key={msg.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{msg.name}</h3>
                        <Badge variant={msg.status === 'UNREAD' ? 'default' : 'secondary'}>
                          {msg.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-semibold text-primary" dir="ltr">{msg.phone}</p>
                    </div>
                    
                    <MessageActions id={msg.id} />
                  </div>
                  
                  <p className="text-muted-foreground text-sm bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(msg.createdAt).toLocaleString('ar-SA')}
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
