import React from 'react';
import Provider from '../provider';
import '../globals.css';
import Nav from "../components/navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Nav />
        {children}
    </>
  );
}
