"use client";

import { startTransition, useActionState } from "react";
import { SaveButton } from "../../ui/base/button";
import { Input } from "../../ui/form/input";
import { Pre } from "../../ui/base/html";
import * as a from "../action";

export default function StatefulForm() {
  const initialState = { name: "安安" };
  const [state, action, pending] = useActionState(
    a.updateNameState,
    initialState,
  );
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    console.log("name:", name);
    startTransition(() => {
      // ✅ 现在 pending 会正确更新
      action(name);
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <Pre json={state} />
      <Input label="名字" name="name" defaultValue={initialState.name} />
      <SaveButton isLoading={pending}>save</SaveButton>
    </form>
  );
}
