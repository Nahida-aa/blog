"use client";

import { demo } from "@/app/a/action/demo/act";
import { SaveButton } from "../../ui/base/button";
import { useSubmit } from "@/app/a/ui/form/utils";

export default function StatefulForm() {
  const { handleSubmit, pending } = useSubmit();

  const onSubmit = async (formData: FormData) => {
    const ret = await demo({ a: "1", b: 2 });
    console.log("ret:", ret);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SaveButton isLoading={pending} />
    </form>
  );
}
