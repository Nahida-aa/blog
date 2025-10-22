"use client";

import { startTransition, useActionState, useState } from "react";
import { SaveButton } from "../../ui/base/button";
import { Input } from "../../ui/form/input";
import { Pre } from "../../ui/base/html";
import * as a from "../action";
import useSWR from "swr";
import { swrAction, type SwrKey } from "@/lib/utils/swr";

export const userKey = (id: string): SwrKey => ["user", id];
export default function Page() {
  const id = "aa";
  const [pending, setPending] = useState(false);
  const { data, error, isValidating, mutate, isLoading } = useSWR(
    ["user", id],
    swrAction(a.getName),
  );
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    console.log("name:", name);
    await a.updateName(name);
    mutate();
    setPending(false);
  };
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error: {error.message}</div>;
  if (!data) return <div>not found</div>;
  return (
    <form onSubmit={onSubmit}>
      <Pre json={data} />
      <Input label="名字" name="name" defaultValue={data.name} />
      <SaveButton isLoading={pending}>save</SaveButton>
    </form>
  );
}
