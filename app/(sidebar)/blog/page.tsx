import { Suspense } from 'react';
import { Loading } from '@/components/ui/loading/Loading';

const BlogListPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <h1>BlogListPage</h1>
      <p>This is the BlogListPage page.</p>
    </Suspense>
  );
}

export default BlogListPage;