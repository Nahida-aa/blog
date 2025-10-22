"use client";

import { SaveButton } from "../../ui/base/button";
import { useSubmit } from "@/app/a/ui/form/utils";

export default function StatefulForm() {
  const { handleSubmit, pending } = useSubmit();

  const onSubmit = async (formData: FormData) => {
    const res = await fetch("/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: "1", b: 2 }),
    });
    const data: { ret: number } = await res.json();
    console.log("ret:", data.ret);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SaveButton isLoading={pending} />
    </form>
  );
}
