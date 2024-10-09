import ProtectedRoute from "@/components/ProtectedRoute";
import * as React from "react";


export default function Page() {
  
  return (
    <ProtectedRoute>
        <h1>Teams!</h1>
    </ProtectedRoute>
  );
}
