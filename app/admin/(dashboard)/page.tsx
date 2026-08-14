export const dynamic = 'force-dynamic';
import { OverviewPage } from '@/components/admin/views/overview';
import { db } from '@/lib/db';

export default async function Page() {
  try {
    const [ordersCount, blogCount, mediaCount, recentRequests] = await Promise.all([
      db.serviceRequest.count(),
      db.contentItem.count(),
      db.mediaItem.count(),
      db.serviceRequest.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
    ]);

    return (
      <OverviewPage
        initialOrdersCount={ordersCount}
        initialBlogCount={blogCount}
        initialMediaCount={mediaCount}
        recentRequests={recentRequests}
      />
    );
  } catch (error) {
    // ponytail: fallback to zero state instead of full page crash.
    // Using warn instead of error to avoid Next.js dev overlay catching the console.error.
    console.warn("Dashboard fetch error (DB likely offline), falling back to zero state.");
    return (
      <OverviewPage
        initialOrdersCount={0}
        initialBlogCount={0}
        initialMediaCount={0}
        recentRequests={[]}
      />
    );
  }
}
