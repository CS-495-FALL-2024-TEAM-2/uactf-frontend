import ProtectedRoute from "@/components/ProtectedRoute";
import AddTeamPage from "@/components/teams/AddTeamPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <AddTeamPage />
    </ProtectedRoute>
  )
}
