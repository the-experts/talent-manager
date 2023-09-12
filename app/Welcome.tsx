'use client';

import {Layout} from "antd";
import React from "react";

export default function Welcome(props: any): JSX.Element {
    const welcomeMessage = props?.colleague ? 'Welcome, ' + props?.colleague?.name + '!' : 'Welcome!';

    return (
        <div>
            <Layout className={'text-black'}>
                {welcomeMessage}
            </Layout>
        </div>
    );
}
