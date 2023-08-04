'use client';

import React from 'react';
import DashboardLayout from "../components/DashboardLayout";
import Welcome from "../components/Welcome";
import {Button} from "antd";
import Skills from "@/components/Skills";

function addSkill() {
  console.log('addSkill called');
}

export default function Home() {
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