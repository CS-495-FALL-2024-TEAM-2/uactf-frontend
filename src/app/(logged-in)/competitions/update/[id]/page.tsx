import ProtectedRoute from "@/components/ProtectedRoute"
import dynamic from "next/dynamic";


export default function Page({ params }: { params: { id: string } }) {

  const UpdateCompetitionsPage = dynamic(() => import('@/components/UpdateCompetitionsPage'))
  
  return (
    <ProtectedRoute>
       <UpdateCompetitionsPage competition_id={params.id}/>
    </ProtectedRoute>
    
  );
}
