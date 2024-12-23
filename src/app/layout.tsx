import React from 'react';
import Provider from './provider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
