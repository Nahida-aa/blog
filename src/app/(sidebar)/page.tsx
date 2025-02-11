import { Suspense } from 'react';
import { Loading } from '@/components/ui/loading/Loading';
// import { Friend } from '../aa/blog/types/friends';
import type { Friend } from '../api/friends/lib';
import ResizableDemo from '../demo/Resizable/page';

const IndexPage = () => {
  async function getFriends(): Promise<Friend[]> {
    // console.log('process.env', process.env)
    // const headers = new Headers(await nextHeaders())
    const res = await fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/friends?state=all`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch friends')
    const data = await res.json()
    if (!Array.isArray(data)) {
      throw new Error('Expected an array of friends: ' + JSON.stringify(data))
    }
    return data
  }
  
  return (
    <Suspense fallback={<Loading />}>
      <h1>IndexPage</h1>
      <p>This is the IndexPage page.</p>
      <ResizableDemo />
    </Suspense>
  );
}

export default IndexPage;