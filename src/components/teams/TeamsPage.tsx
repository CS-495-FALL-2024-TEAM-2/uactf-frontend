'use client';

import { useGetCurrentUser } from '@/contexts/current-user.context';
import TeacherViewTeams from './TeacherViewTeams';
import AdminViewTeams from '../teachers/TeachersPage';

export default function TeamsPage() {
  const currentUser = useGetCurrentUser();

  return (
    <div className="h-full w-full">
      {currentUser?.userRole === 'teacher' ? (
        <TeacherViewTeams />
      ) : (
        <AdminViewTeams />
      )}
    </div>
  );
}
