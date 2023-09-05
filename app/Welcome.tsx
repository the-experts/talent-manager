'use client';

import {Layout} from "antd";
import React from "react";
import {DbUser, useUserDataHandling} from "@/app/hooks/user";

export default function Welcome(): JSX.Element {
    const user: DbUser|null = useUserDataHandling();
    const welcomeMessage = user ? 'Welkom, ' + user.name + '!' : 'Welcome! Please log in.';

    return (
        <div>
            <Layout className={'text-black'}>
                {welcomeMessage}
            </Layout>
        </div>
    );
}
