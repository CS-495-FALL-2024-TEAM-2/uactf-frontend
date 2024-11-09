'use client';

import { teamsData } from '@/utils/mockData/teamsData';
import { NextUIProvider } from '@nextui-org/system';
import TeamTable from './TeamTable';

export default function TeamsPage() {
  const mockTeams = teamsData;

  return (
    <NextUIProvider>
      <div className="flex flex-col justify-center p-4">
        {mockTeams.map((team) => {
          return <TeamTable key={team.id} teamData={team} />;
        })}
      </div>
    </NextUIProvider>
  );
}
