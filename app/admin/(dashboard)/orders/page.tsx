import { db } from '@/lib/db';
import { updateRequestStatus } from '@/app/actions/orders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  let requests: any[] = [];
  try {
    requests = await db.serviceRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    // ponytail: warning instead of error to bypass Next.js aggressive dev overlay for caught exceptions
    console.warn("Orders fetch error (DB likely offline), falling back to empty state.");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Service Requests</h1>
        <p className="text-muted-foreground mt-1">
          Manage mobile tire services and dispatch notifications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Fleet Queue</CardTitle>
          <CardDescription>Direct interface for assigning and completing customer orders.</CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">No service requests yet.</div>
          ) : (
            <div className="divide-y">
              {requests.map((req) => (
                <div key={req.id} className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-base">{req.name}</p>
                    <p className="text-sm text-muted-foreground">{req.serviceType} — {req.location}</p>
                    <p className="text-xs text-muted-foreground">Phone: {req.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={req.status === 'COMPLETED' ? 'default' : 'secondary'}>
                      {req.status}
                    </Badge>
                    <form action={async () => {
                      'use server';
                      await updateRequestStatus(req.id, req.status === 'PENDING' ? 'ASSIGNED' : 'COMPLETED');
                    }}>
                      <button className="text-xs font-semibold px-3 py-1.5 border rounded hover:bg-muted transition-colors">
                        {req.status === 'PENDING' ? 'Assign Fleet' : req.status === 'ASSIGNED' ? 'Mark Done' : 'Archive'}
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
