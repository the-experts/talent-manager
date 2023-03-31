
import {SessionProvider, useSession} from "next-auth/react";
import {Layout} from "antd";
import React from "react";

export default function Welcome() {
    const { data: session } = useSession();
    const username = session?.user?.name;

    return (
        <SessionProvider>
            <Layout>
                Welkom, { username }!
            </Layout>
        </SessionProvider>
    );
}
