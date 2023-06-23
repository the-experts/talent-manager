
import {SessionProvider, useSession} from "next-auth/react";
import {Layout} from "antd";
import React from "react";

export default function Welcome() {
    const { data: session } = useSession();
    const welcomeMessage = session?.user ? 'Welkom, ' + session?.user?.name + '!' : 'Welcome! Please log in.';

    return (
        <SessionProvider>
            <Layout className={'text-black'}>
                { welcomeMessage }
            </Layout>
        </SessionProvider>
    );
}
