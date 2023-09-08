import {useEffect, useState} from "react";
import axios from "axios";
import {useUser} from "@clerk/nextjs";

export function useUserDataHandling (): DbUser|null {
    const {user, isLoaded} = useUser();
    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
        if (!user) {
            return;
        }

        try {
            const res = await axios.post('/api/fetch-colleague', {email: user?.primaryEmailAddress?.emailAddress ?? ''})
                .catch((error) => {
                    console.error('post error fetch-colleague', error);
                });

            const rowCount = res?.data?.userExistQuery?.rowCount;

            if (rowCount === 1) {
                // user already exists in DB, return existing user
                setDbUser(res?.data.userExistQuery?.rows[0]);
            } else if (rowCount === 0) {
                const email = user?.primaryEmailAddress?.emailAddress;
                const name = user?.fullName;

                const res = await axios.post('/api/add-colleague', {email: email, name: name, roles_id: 3});
                const userAddedToDb = await res?.data?.addUserQuery?.rows[0];
                setDbUser(userAddedToDb);

                if (userAddedToDb) {
                    console.info('added colleague ' + email + ' to database');
                }
            }

        } catch (error) {
            console.error('error:', error)
        }
    };

    fetchData();
    }, [user]);

    return dbUser;
}

export type DbUser = {
    id: number;
    name: string;
    email: string;
    roles_id: number;
}

