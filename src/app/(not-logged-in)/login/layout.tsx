import React from 'react';
import Banner from '@/components/Banner';
import '../../globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-w-screen min-h-screen max-h-screen">
      <Banner />
      {children}
    </div>
  );
}
