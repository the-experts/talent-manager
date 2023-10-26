'use client';

import React from 'react';
import { SignOutButton } from '@clerk/nextjs';

const LogOut = () => {
  return (
    <SignOutButton>
      <button className={'border rounded text-white p-2'}>Log Out</button>
    </SignOutButton>
  );
};

export default LogOut;
