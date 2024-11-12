'use client';

import { teamsData } from '@/utils/mockData/teamsData';
import { NextUIProvider } from '@nextui-org/system';
import TeamsTable from './TeamsTable';

export default function TeacherViewTeams({
  teacherId,
}: {
  teacherId?: string;
}) {
  const mockTeams = teamsData;

  return (
    <NextUIProvider>
      <div className="flex flex-col justify-center p-4">
        {mockTeams.map((team) => {
          return <TeamsTable key={team.id} teamData={team} />;
        })}
      </div>
    </NextUIProvider>
  );
}
