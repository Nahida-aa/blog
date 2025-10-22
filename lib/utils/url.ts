import type { ReadonlyURLSearchParams } from "next/navigation";

export const addSearchParams = (url: string, searchParams: ReadonlyURLSearchParams | null) => {
  const searchString = searchParams?.toString()
  if (searchString) {
    // console.log('searchParams:', searchParams, searchString, searchString.length);
    return `${url}${url.includes("?") ? "&" : "?"}${searchString}`;
  }
  return url;
}