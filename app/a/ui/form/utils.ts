import { useState } from "react";

export function handleSubmit<T extends Record<string, any>>(
  onSubmit: (data: T) => Promise<void> | void,
) {
  return async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as T;
    await onSubmit(data);
  };
}

export const useSubmit = () => {
  const [pending, setPending] = useState(false);
  return {
    handleSubmit: (onSubmit: (formData: FormData) => Promise<void> | void) => {
      return async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);

        const formData = new FormData(e.target as HTMLFormElement);
        await onSubmit(formData);

        setPending(false);
      };
    },
    pending,
  };
};
