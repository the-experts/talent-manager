'use client';

import React, {useState} from 'react';
import DashboardLayout from "./DashboardLayout";
import Welcome from "./Welcome";
import Skills from "./Skills";
import ModalWrapper from "@/app/ModalWrapper";

export default function Home():JSX.Element {
    const [dbUser, setDbUser] = useState(null);

    function UserDataCallback(userData: React.SetStateAction<null>) {
        setDbUser(userData);
        return userData;
    }

    return (
          <DashboardLayout user={dbUser}>
              <Welcome handleCallback={UserDataCallback}></Welcome>
              <div className={'flex place-content-between'}>
                  <Skills className={'my-6 w-4/5'}></Skills>
                  <ModalWrapper className={'my-6 ml-3 w-1/6'} />
              </div>
          </DashboardLayout>
    )
}