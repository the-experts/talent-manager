import {useEffect, useState} from "react";
import axios from "axios";

export function useFetchAllSkills(): Skill[] {
    const [allSkills, setAllSkills] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get('/api/fetch-all-skills')
                .catch((error) => {
                    console.error('post error fetch-skills', error);
                });

            const rows = res?.data?.allSkills?.rows;
            setAllSkills(rows);

        } catch (error) {
            console.error('error:', error)
        }
    };

    fetchData();
    }, []);

    return allSkills;
}

export type Skill = {
    id: number;
    name: string;
    categories_id: number;
}

