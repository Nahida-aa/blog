"use client";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { getWakaTimeSummary } from "@/app/(sidebar)/dashboard/action";
import { Pre } from "@/app/a/ui/base/html";

export default function Client() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: summary } = useSWR(
    "getWakaTimeSummary",
    async () => await getWakaTimeSummary(),
  );

  useEffect(() => {
    // Side effects here
  }, []);

  return (
    <section>
      <h2>ClientPage</h2>
      <p>This is the Page page.</p>
      <Pre json={summary} />
    </section>
  );
}
