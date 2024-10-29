import ProtectedRoute from "@/components/ProtectedRoute";
import dynamic from "next/dynamic";
import * as React from "react";

const TeamsPage = dynamic(() => import("@/components/teams/TeamsPage"));

export default function Page() {

  return (
    <ProtectedRoute>
      <TeamsPage />
    </ProtectedRoute>
  );
}
