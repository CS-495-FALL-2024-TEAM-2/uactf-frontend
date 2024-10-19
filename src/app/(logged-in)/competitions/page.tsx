// import * as React from "react";

import ProtectedRoute from "@/components/ProtectedRoute"


export default function Page() {
  
  return (
    <ProtectedRoute>
        <h1>Competitions!</h1>
    </ProtectedRoute>
    
  );
}
