import ProtectedRoute from '@/components/ProtectedRoute';
import UpdateTeamPage from '@/components/teams/UpdateTeamPage';
import dynamic from 'next/dynamic';

export default function Page({ params }: { params: { id: string } }) {
  const UpdateChallengePage = dynamic(() =>
    import('@/components/teams/UpdateTeamPage')
  );

  return (
    <ProtectedRoute>
      <UpdateTeamPage teamId={params.id} />
    </ProtectedRoute>
  );
}
