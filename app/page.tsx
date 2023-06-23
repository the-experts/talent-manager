"use client"
import type {NextPage} from 'next'
import React from 'react';
import DashboardLayout from "../components/DashboardLayout";
import Welcome from "../components/Welcome";
import Skills from "../components/skills";
import {Button} from "antd";
import {SessionProvider} from "next-auth/react";
import {Session} from "inspector";
import {ISODateString} from "next-auth";

function addSkill() {
  console.log('addSkill called');
}

export interface ExpirableSession extends Session {
        expires: ISODateString
};

const Home = (session: ExpirableSession) => {
  return (
          <DashboardLayout>
              <Welcome></Welcome>
              <div className={'flex place-content-between'}>
                  <Skills className={'my-6 w-4/5'}></Skills>
                  <Button className={'my-6 ml-3 w-1/6'} onClick={() => addSkill()}>Skill toevoegen</Button>
              </div>
          </DashboardLayout>
  )
}

export default Home
