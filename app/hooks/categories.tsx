import useSWR from "swr";
import {fetcher} from "@/app/hooks/helper";

export function useAllCategories () {
    const { data, error, isLoading } = useSWR('/api/fetch-all-categories', fetcher)

    return {
        categories: data?.categories?.rows,
        isLoading,
        isError: error
    }
}

export type Category = {
    id: string;
    name: string;
}