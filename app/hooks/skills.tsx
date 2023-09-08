import {useEffect, useState} from "react";
import axios from "axios";
import {useUser} from "@clerk/nextjs";
import {DbUser} from "@/app/hooks/user";
import {ColleagueSkillItem} from "@/app/SkillList";

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

export function useFetchUserSkills(colleagueId: number): Skill[] {
    const [userSkills, setUserSkills] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/fetch-colleague-skills?colleague_id=${colleagueId}`)
                    .catch((error) => {
                        console.error('post error fetch-colleague-skills', error);
                    });

                const rows = res?.data?.allSkills?.rows;
                setUserSkills(rows);

            } catch (error) {
                console.error('error:', error)
            }
        };

        fetchData();
    }, [colleagueId]);

    return userSkills;
}

export function useAddSkillToColleague (skill: ColleagueSkillItem) {
    const [skillOfColleague, setSkillOfColleague] = useState(null);

    useEffect(() => {
        const saveSkillToColleague = async () => {
            if (!skillOfColleague) {
                return;
            }

            try {
                const res = await axios.post('/api/add-skill-to-colleague',
                    {skillForColleague: skillOfColleague ?? ''}
                )
                    .catch((error) => {
                        console.error('post error add-skill-to-colleague', error);
                    });

                const rowCount = res?.data?.addSkillToColleagueQuery?.rowCount;

                if (rowCount === 1) {
                    setSkillOfColleague(res?.data.addSkillToColleagueQuery?.rows[0]);
                }
            } catch (error) {
                console.error('error:', error)
            }
        };

        saveSkillToColleague();
    }, [skill]);

    return skillOfColleague;
}

export type Skill = {
    id: number;
    name: string;
    categories_id: number;
}

