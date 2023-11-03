import { useEffect, useState } from 'react';
import axios from 'axios';
import { ColleagueSkillItem, SkillItem } from '@/app/SkillList';

export function useFetchAllSkills(): SkillItem[] {
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/fetch-all-skills').catch((error) => {
          console.error('error fetch-skills', error);
        });

        const rows = res?.data?.allSkills?.rows;
        setAllSkills(rows);
      } catch (error) {
        console.error('error:', error);
      }
    };

    fetchData();
  }, []);

  return allSkills;
}

export function useFetchColleagueSkills(
  colleagueId: number,
): ColleagueSkillItem[] | null {
  const [userSkills, setUserSkills] = useState([]);

  useEffect(() => {
    if (!colleagueId) {
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios
          .get(`/api/fetch-colleague-skills?colleague_id=${colleagueId}`)
          .catch((error) => {
            console.error('post error fetch-colleague-skills', error);
          });

        const rows = res?.data?.allSkills?.rows;
        setUserSkills(rows);
      } catch (error) {
        console.error('error:', error);
      }
    };

    fetchData();
  }, [colleagueId]);

  return userSkills;
}
