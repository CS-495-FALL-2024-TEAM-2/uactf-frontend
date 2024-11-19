import ProtectedRoute from "@/components/ProtectedRoute"
import dynamic from "next/dynamic";


export default function Page() {

  const ApproveSignedLiabilityReleaseFormPage = dynamic(() => import('@/components/ApproveSignedLiabilityReleaseFormPage'))
  
  return (
    <ProtectedRoute>
       <ApproveSignedLiabilityReleaseFormPage />
    </ProtectedRoute>
    
  );
}
