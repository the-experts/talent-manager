import useSWR from "swr";

const fetcher = (...args: any[]) => fetch(args[0], args[1]).then(res => res.json());

export function useAllCategories () {
    const { data, error, isLoading } = useSWR('/api/fetch-all-categories', fetcher)

    return {
        categories: data.categories.rows,
        isLoading,
        isError: error
    }
}

export type Category = {
    id: string;
    name: string;
}