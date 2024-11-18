'use client';

import { AddTeamFormData } from '@/types/forms.types';
import React, { useEffect } from 'react';
import AddTeamForm from './AddTeamForm';
import { useCreateTeam } from '@/hooks/teams.hooks';
import { useToast } from '@chakra-ui/react';

export default function AddTeamPage() {
  const [
    teamInfo,
    setTeamInfo,
  ] = React.useState<AddTeamFormData | null>(null);

  const toast = useToast();

  const { mutate: createTeam, isPending } = useCreateTeam(
    (data) => {
      toast({
        title: 'Team created',
        position: 'top',
        description: 'Team has been created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTeamInfo(null);
    },
    (error) => {
      toast({
        title: 'Error creating team',
        position: 'top',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  );

  useEffect(() => {
    if (teamInfo) {
      createTeam(teamInfo);
    }
  }, [teamInfo]);

  return (
    <div className="w-full flex flex-row justify-center">
      <AddTeamForm setTeamInfo={setTeamInfo} isPending={isPending} />
    </div>
  );
}
