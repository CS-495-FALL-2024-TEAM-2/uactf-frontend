"use client"
import * as React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import dynamic from "next/dynamic";

const ChallengesPage = dynamic(() => import("@/components/ChallengesPage"));
  

export default function Page() {
  return (
    <ProtectedRoute>
      <ChallengesPage />
    </ProtectedRoute>
  );
}
