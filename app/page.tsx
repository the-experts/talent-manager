'use client';

import React from 'react';
import DashboardLayout from "./DashboardLayout";
import Welcome from "./Welcome";
import Skills from "./Skills";
import {useUserDataHandling} from "@/app/hooks/user";

export default function Home() {
    const {isLoaded, isSignedIn, dbUser:colleague} = useUserDataHandling();

    if(!isLoaded || !isSignedIn) {
        return null;
    }
    return (
          <DashboardLayout colleague={colleague}>
              <Welcome colleague={colleague}></Welcome>
              <div className={'flex place-content-between'}>
                  <Skills colleagueId={colleague?.id} className={'my-6 w-4/5'}></Skills>
              </div>
          </DashboardLayout>
    )
}