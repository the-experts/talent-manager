'use client';

import React from "react";
import {useSession, signIn, signOut, SessionProvider} from "next-auth/react";
import {Button} from "antd";


const Page = () => {
    const { data: session } = useSession();
    let logInLogout = (<div><Button className={'text-white'} onClick={() => signIn("google", { callbackUrl: "/api/auth/callback/google" })}>Log In With Google</Button></div>)

    if (session?.user) {
        logInLogout = (
            <div>
                Signed in as {session?.user?.name}
                <br/>
                <Button className={'text-white'} onClick={() => signOut()}>Log Out</Button>
            </div>
        );
    }

    return  (
        <SessionProvider session={session}>
            { logInLogout }
        </SessionProvider>
    );
};

export default Page;
