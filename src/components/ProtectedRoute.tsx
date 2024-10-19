"use client"


import { useProtectedRoute } from "@/hooks/routes.hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


export default function ProtectedRoute({ children }: {
    children: React.ReactNode;
  }) {
  const router = useRouter();
  const isValidRoute = useProtectedRoute();

  useEffect(() => {
    if (isValidRoute === false){
      router.replace("/");
    }
  }, []);


  if (isValidRoute){
    return (
      <>{children}</>
    );
  }

  return <div>Loading...</div>;

  
}