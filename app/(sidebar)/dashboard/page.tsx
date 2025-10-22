// https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-dynamic-segment

import { getWakaTimeSummary } from "@/app/(sidebar)/dashboard/action";
import Client from "@/app/(sidebar)/dashboard/client";
import { Pre } from "@/app/a/ui/base/html";

export default async function Page() {
  const summary = await getWakaTimeSummary();
  return (
    <main>
      <h2>ServerPage</h2>
      <Pre json={[summary]} />
      <Client />
    </main>
  );
}
