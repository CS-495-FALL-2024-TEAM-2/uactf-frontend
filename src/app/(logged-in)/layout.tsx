import React from 'react';
import Navbar from "../../components/Navbar";
import '../globals.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
        <Navbar />
        {children}
    </>
  );
}
