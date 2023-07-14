import {Layout} from "antd";
import React from "react";
import {useUser} from "@clerk/nextjs";

export default function Welcome() {
    // Use the useUser hook to get the Clerk.user object
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (<div>Loading</div>);
    }

    const welcomeMessage = user ? 'Welkom, ' + user.fullName + '!' : 'Welcome! Please log in.';

    return (
        <div>
            <Layout className={'text-black'}>
                {welcomeMessage}
            </Layout>
        </div>
    );
}
