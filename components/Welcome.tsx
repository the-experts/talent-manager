'use client';

import {Layout} from "antd";
import React from "react";
import {useUser} from "@clerk/nextjs";
import {useCreateNewUser, useUserExistsOrNot} from "@/app/hooks/user";

export default function Welcome() {
    // Use the useUser hook to get the Clerk.user object
    const { user, isLoaded } = useUser();
    console.log('user', user?.primaryEmailAddress?.emailAddress)

    if (!isLoaded) {
        return (<div>Loading</div>);
    }

    const { data, isLoading } = useUserExistsOrNot(user?.primaryEmailAddress?.emailAddress);
    console.log('userExistsOrNot data', data);

    if (isLoading) {
        return (<div>Loading</div>);
    }

    // TODO: only call below hook when user is not present in DB / returned from above hook
    // const { data: createdUserData, isLoading: isLoadingUserData, isError: isErrorPresent } = useCreateNewUser(user?.primaryEmailAddress?.emailAddress, user?.fullName, 3);
    // console.log(createdUserData);

    const welcomeMessage = user ? 'Welkom, ' + user.fullName + '!' : 'Welcome! Please log in.';

    // check if user exists in db
    // if not: create with clerk user.id, user.fullName, user.primaryEmailAddress.emailAddress

    return (
        <div>
            <Layout className={'text-black'}>
                {welcomeMessage}
            </Layout>
        </div>
    );
}
