"use client";

import { startTransition, useActionState, useState } from "react";
import { SaveButton } from "../ui/base/button";
import { Input } from "../ui/form/input";
import { Pre } from "../ui/base/html";
import * as a from "./action";
import { useSubmit } from "@/app/a/ui/form/utils";

export default function StatefulForm() {
  const initialState = { name: "aa" };
  const [state, setState] = useState(initialState);

  const { handleSubmit, pending } = useSubmit();

  const onSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    console.log("name:", name);
    await a.updateName(name);
    setState({ name });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Pre json={state} />
      <Input label="名字" name="name" defaultValue={initialState.name} />
      <SaveButton isLoading={pending}>save</SaveButton>
    </form>
  );
}
