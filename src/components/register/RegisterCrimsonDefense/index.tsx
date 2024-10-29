'use client';

import React, { useEffect } from 'react';
import RegisterCDMembersForm from './RegisterCDMembersForm';
import { CDMemberRegisterFormData } from '../../../types/forms.types';
import { Box, Spinner, Stack, Text } from '@chakra-ui/react';
import { useCreateCDMember } from '@/hooks/accounts.hooks';

export default function RegisterCrimsonDefense() {
  const [
    cdMemberFormInput,
    setCDMemberFormInput,
  ] = React.useState<CDMemberRegisterFormData | null>(null);
  const [status, setStatus] = React.useState<
    'pending' | 'success' | 'error'
  >('pending');

  const { mutate: createCDMember } = useCreateCDMember(
    (data) => {
      setStatus('success');
      setCDMemberFormInput(null);
    },
    (error) => {
      setStatus('error');
    }
  );

  const handleRegistration = () => {
    if (cdMemberFormInput) {
      createCDMember({
        competition_id: '1', // TODO: Update this to the actual competition id
        email: cdMemberFormInput.email,
        role: 'crimson_defense',
      });
    }
  };

  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const steps = [
    {
      label: 'Register CD Members',
      component: (
        <RegisterCDMembersForm
          setCDMemberFormInput={setCDMemberFormInput}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      label: 'Starting Registration',
      component: (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Stack alignItems="center">
            <Spinner size="lg" />
            <Text fontSize="3xl">
              Registering crimson defense member...
            </Text>
          </Stack>
        </Box>
      ),
    },
    {
      label: 'Complete Registration',
      component: (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {status === 'success' ? (
            <Text fontSize="3xl">
              Registration completes successfully!
            </Text>
          ) : (
            <Stack alignItems="center">
              <Text fontSize="3xl">
                Error registering crimson defense member!
              </Text>
              <Text fontSize="3xl">Please try again later!</Text>
            </Stack>
          )}
        </Box>
      ),
    },
  ];

  useEffect(() => {
    if (currentStep === 1) {
      handleRegistration();
    }
  }, [currentStep]);

  useEffect(() => {
    if (status !== 'pending') {
      setCurrentStep(2);
    }
  }, [status]);

  return <>{steps[currentStep].component}</>;
}
