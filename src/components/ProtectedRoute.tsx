"use client"


import { useProtectedRoute } from "@/hooks/routes.hooks";
import React from "react";


export default function ProtectedRoute({ children }: {
    children: React.ReactNode;
  }) {
  const isValidRoute = useProtectedRoute();

  if (!isValidRoute) {
    return <div>Loading...</div>;
  }

  return (
    <>{children}</>
  );
}