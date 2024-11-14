import ProtectedRoute from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';

const TeachersPage = dynamic(() => import('@/components/teachers/TeachersPage'));

export default function Page() {

  return (
    <ProtectedRoute>
      <TeachersPage />
    </ProtectedRoute>
  );
}
