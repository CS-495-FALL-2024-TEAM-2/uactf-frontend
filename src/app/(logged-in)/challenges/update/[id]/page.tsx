import ProtectedRoute from "@/components/ProtectedRoute"
import dynamic from "next/dynamic";


export default function Page({ params }: { params: { id: string } }) {

  const UpdateChallengePage = dynamic(() => import('@/components/UpdateChallengePage'))
  
  return (
    <ProtectedRoute>
       <UpdateChallengePage challengeId={params.id} />
    </ProtectedRoute>
    
  );
}
