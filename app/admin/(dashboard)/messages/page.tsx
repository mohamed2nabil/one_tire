import { db } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  let messages: any[] = [];
  try {
    messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.warn("DB offline, falling back to empty state.");
  }

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
          <p className="text-muted-foreground mt-1">
            View messages from the public contact form.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Messages from visitors.</CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No messages found.
            </div>
          ) : (
            <div className="divide-y">
              {messages.map((msg: any) => (
                <div key={msg.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{msg.name}</h3>
                      <p className="text-sm font-semibold text-primary" dir="ltr">{msg.phone}</p>
                    </div>
                    <Badge variant={msg.status === 'UNREAD' ? 'default' : 'secondary'}>
                      {msg.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm bg-muted/50 p-3 rounded-lg">
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
  );
}
