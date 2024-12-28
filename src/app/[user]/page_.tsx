// src/app/[user]/page.tsx
import { notFound } from 'next/navigation';

import { cookies } from 'next/headers';
import Profile from './_comp/Profile';

const UserProfile = async ({ params, searchParams }: { params: { username: string }, searchParams: { tab?: string } }) => {
  const { username } = params;
  const tab = searchParams.tab || 'overview';
  console.log('tab:', tab);

  // 从 cookies 中获取当前用户的信息
  const cookieStore = cookies();
  const currentUsername = cookieStore.get('dotcom_user')?.value || '';
  return (
    <main className="">
      <Profile />
    </main>
  )
};

export default UserProfile;