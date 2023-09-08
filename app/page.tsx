'use client';

import React, {useState} from 'react';
import DashboardLayout from "./DashboardLayout";
import Welcome from "./Welcome";
import Skills from "./Skills";

export default function Home():JSX.Element {
    const [dbUser, setDbUser] = useState(null);

    function UserDataCallback(userData: any) {
        setDbUser(userData);
        return userData;
    }

    return (
          <DashboardLayout user={dbUser}>
              <Welcome handleCallback={UserDataCallback}></Welcome>
              <div className={'flex place-content-between'}>
                  <Skills colleagueId={dbUser?.id} className={'my-6 w-4/5'}></Skills>
              </div>
          </DashboardLayout>
    )
}