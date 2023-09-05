import axios from "axios";
import {useEffect, useState} from "react";

export function useAllCategories () {

    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('/api/fetch-all-categories');
            const data = await res.data.categories.rows;
            setAllCategories(data);
        }
        fetchData();
    }, []);

    return allCategories;
}

export type Category = {
    id: string;
    name: string;
}