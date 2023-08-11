import useSWR from "swr";
import {fetcher} from "@/app/hooks/helper";
import {UserResource} from "@clerk/types";

export function useUserExistsOrNot (email: string = '') {
    if (!email) {
        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }
        const { data, error, isLoading } = useSWR(`/api/fetch-user?email=${email}`, fetcher)

        return {
            data,
            isLoading,
            isError: error
        }
}

export function useCreateNewUser(user: UserResource|null|undefined, roleId?: number) {
    // email, name, roles_id
    // roles: Admin: 1, Sales: 2, Employee: 3

    if (!user) {
        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }

        const email = user?.primaryEmailAddress?.emailAddress;
        const name = user?.fullName;

        const { data, error, isLoading } = useSWR(`/api/add-user?email=${email}&name=${name}&role=${roleId ?? 3}`, fetcher)

        console.log('create user data', data);

        return {
            data,
            isLoading,
            isError: error
        }
}