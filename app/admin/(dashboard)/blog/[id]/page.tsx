import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditPostPage from '@/components/admin/blog-edit-form';

export const dynamic = 'force-dynamic';

export default async function AdminEditBlogPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = await db.contentItem.findUnique({
    where: { id: parseInt(params.id, 10) }
  });

  if (!post) {
    notFound();
  }

  return <EditPostPage post={post} />;
}
