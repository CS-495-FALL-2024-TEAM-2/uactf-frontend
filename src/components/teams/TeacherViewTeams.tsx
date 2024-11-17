'use client';

import { NextUIProvider } from '@nextui-org/system';
import TeamTable from './TeamTable';
import { useGetTeams } from '@/hooks/teams.hooks';
import { Button, Spinner, Text } from '@chakra-ui/react';
import Link from 'next/link';

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
    );
  }

  return (
    <NextUIProvider>
      <div className="h-full flex flex-col justify-center p-4 gap-2 relative">
        <Link href="/teams/add">
          <Button
            colorScheme="green"
            position="absolute"
            top={2}
            right={2}
          >
            Add New Team
          </Button>
        </Link>
        {teams.map((team) => {
          return <TeamTable key={team.id} teamData={team} />;
        })}
      </div>
    </NextUIProvider>
  );
}
