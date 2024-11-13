'use client';

import { NextUIProvider } from '@nextui-org/system';
import TeamTable from './TeamTable';
import { useGetTeams } from '@/hooks/teams.hooks';
import { Spinner, Text } from '@chakra-ui/react';

export default function TeacherViewTeams({
  teacherId,
}: {
  teacherId?: string;
}) {
  const { data, isPending } = useGetTeams(teacherId || '');
  const teams = data?.teams || [];

  if (isPending) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <NextUIProvider>
      <div className="flex flex-col justify-center p-4 gap-2">
        {teams.map((team) => {
          return <TeamTable key={team.id} teamData={team} />;
        })}
      </div>
    </NextUIProvider>
  );
}
