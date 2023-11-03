'use client';

import React from 'react';
import DashboardLayout from '../DashboardLayout';
import Welcome from '../Welcome';
import { useUserDataHandling } from '@/app/hooks/user';
import { Divider } from 'antd';
import AdminSearch from '@/app/AdminSearch';

export default function AdminHome() {
  const { isLoaded, isSignedIn, dbUser: colleague } = useUserDataHandling();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <DashboardLayout>
      <Welcome colleague={colleague}></Welcome>
      <Divider />
      <div className={'text-black'}>
        <div className={'w-full m-3 mt-5'}>
          <AdminSearch />
        </div>
      </div>
    </DashboardLayout>
  );
}
