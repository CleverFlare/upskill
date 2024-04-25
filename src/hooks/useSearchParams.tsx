import {
  useSearchParams as useNextSearchParams,
  useRouter,
} from "next/navigation";

export default function useSearchParam() {
  const searchParams = useNextSearchParams();
  const router = useRouter();
  const mutSearchParams = new URLSearchParams(searchParams);

  function setSearchParams() {
    router.push("?" + mutSearchParams.toString());
  }

  function set(name: string, value: string) {
    mutSearchParams.set(name, value);

    setSearchParams();
  }

  function remove(name: string) {
    mutSearchParams.delete(name);

    setSearchParams();
  }

  function reset() {
    router.push("?");
  }

  return { set, remove, reset };
}
