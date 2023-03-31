"use client"
import type {NextPage} from 'next'
import React from 'react';
import DashboardLayout from "../components/DashboardLayout";
import Welcome from "../components/Welcome";
import Skills from "../components/skills";
import {Button} from "antd";
import {SessionProvider} from "next-auth/react";

function addSkill() {
  console.log('addSkill called');
}

const Home: NextPage = () => {
  return (
      <SessionProvider>
          <DashboardLayout>
              <Welcome></Welcome>
              <div className={'flex place-content-between'}>
                  <Skills className={'my-6 w-4/5'}></Skills>
                  <Button className={'my-6 ml-3 w-1/6'} onClick={() => addSkill()}>Skill toevoegen</Button>
              </div>
          </DashboardLayout>
      </SessionProvider>
  )
}

export default Home
