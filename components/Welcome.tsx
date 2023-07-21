import {Layout} from "antd";
import React from "react";
import {useUser} from "@clerk/nextjs";

export default function Welcome() {
    // Use the useUser hook to get the Clerk.user object
    const { user, isLoaded } = useUser();

    const checkIfUserExists = async e => {
        if (user) {
            try {
                const body = { id: user.id };
                const userRecord = await fetch(`/api/fetch-user`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body),
                })
                console.log('userRecord', userRecord)
            } catch (error) {
                console.error(error);
            }
        }
    }
    

    if (!isLoaded) {
        return (<div>Loading</div>);
    }

    console.log('user', user)

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
