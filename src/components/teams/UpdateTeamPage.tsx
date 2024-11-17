'use client';

import { Heading, Stack, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { AddTeamFormData } from '@/types/forms.types';
import { useUpdateTeam } from '@/hooks/teams.hooks';
import UpdateTeamForm from './UpdateTeamForm';
import { UpdateTeamRequest } from '@/types/teams.types';

export default function UpdateTeamPage({
  teamId,
}: {
  teamId: string;
}) {
  const toast = useToast();

  const [teamInfo, setTeamInfo] = React.useState<
    UpdateTeamRequest | null
  >(null);

  const { mutate: updateTeam, isPending } = useUpdateTeam(teamId,
    (data) => {
      toast({
        title: 'Team updated successfully',
        position: 'top',
        description: 'Team has been updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    (error) => {
      toast({
        title: 'Error updating team',
        position: 'top',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  );

  useEffect(() => {
    if (teamInfo) {
      updateTeam(teamInfo);
    }
  }, [teamInfo]);

  return (
    <Stack className="p-4 mt-4" align={'center'}>
      <Heading as="h1" size="lg" className="mb-4">
        Update Team
      </Heading>
      <UpdateTeamForm
        setTeamInfo={setTeamInfo}
        isPending={isPending}
        isUpdateTeam={true}
        teamId={teamId}
      />
    </Stack>
  );
}
