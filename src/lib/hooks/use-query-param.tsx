import { useRouter, useSearchParams } from "next/navigation"

export default function useQueryParam() {
   const searchParams = useSearchParams();
   const router = useRouter();

   const setParam = (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, value)
      router.replace(`?${params.toString()}`)
   }
   const removeParam = (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key)
      router.replace(`?${params.toString()}`, { scroll: false })
   }
   const getParam = (key: string) => {
      return searchParams.get(key)
   }

   return { getParam, removeParam, setParam }
}
