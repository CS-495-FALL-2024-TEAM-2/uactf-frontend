import React from 'react';
import '../../globals.css';
import PublicNavbar from '@/components/PublicNavbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-w-screen min-h-screen max-h-screen">
      <PublicNavbar />
      {children}
    </div>
  );
}
