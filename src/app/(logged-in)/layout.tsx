"use client"

import React, { ReactNode } from 'react';
import '../globals.css';
import { useGetCurrentUser } from '@/contexts/current-user.context';
import AdminNavbar from '@/components/nav-bar/AdminNavbar';
import TeacherNavbar from '@/components/nav-bar/TeacherNavbar';
import CrimsonDefenseNavbar from '@/components/nav-bar/CrimsonDefenseNavbar';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentUser = useGetCurrentUser();

  const mapRoleToNavbar : { [key: string]: ReactNode } = {
    'admin': <AdminNavbar />,
    'teacher': <TeacherNavbar />,
    'crimson_defense': <CrimsonDefenseNavbar />
  };
  
  return (
    <>
        {currentUser?.userRole && mapRoleToNavbar[currentUser.userRole]}
        {children}
    </>
  );
}
