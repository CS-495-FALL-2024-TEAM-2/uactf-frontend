// import * as React from "react";

import ProtectedRoute from "@/components/ProtectedRoute"
import dynamic from "next/dynamic";


export default function Page() {

  const CompetitionsPage = dynamic(() => import('@/components/CompetitionsPage'))
  
  return (
    <ProtectedRoute>
       <CompetitionsPage />
    </ProtectedRoute>
    
  );
}
