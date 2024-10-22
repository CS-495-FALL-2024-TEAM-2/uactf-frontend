import ProtectedRoute from "@/components/ProtectedRoute"
import dynamic from "next/dynamic";


export default function Page() {

  const CreateCompetitionsPage = dynamic(() => import('@/components/CreateCompetitionsPage'))
  
  return (
    <ProtectedRoute>
       <CreateCompetitionsPage />
    </ProtectedRoute>
    
  );
}
