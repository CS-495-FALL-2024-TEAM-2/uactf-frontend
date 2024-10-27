'use client';

import React, { useEffect } from 'react';
import {
  AddTeamFormData,
  TeacherRegisterFormData,
} from '@/types/forms.types';
import RegisterTeacherForm from './RegisterTeacherForm';
import AddTeamForm from '../../AddTeamForm';
import { Box, Spinner, Stack, Text } from '@chakra-ui/react';
import { useCreateTeacher } from '@/hooks/accounts.hooks';

export default function RegisterTeacher() {
  const [
    teacherRegisterFormInput,
    setTeacherRegisterFormInput,
  ] = React.useState<TeacherRegisterFormData | null>(null);
  const [
    teamInfo,
    setTeamInfo,
  ] = React.useState<AddTeamFormData | null>(null);
  const [status, setStatus] = React.useState<
    'pending' | 'success' | 'error'
  >('pending');

  const { mutate: createTeacher } = useCreateTeacher(
    (data) => {
      // TODO: Add team members if there are any
      setTeacherRegisterFormInput(null);
      setStatus('success');
    },
    (error) => {
      setStatus('error');
    }
  );

  const handleRegistration = () => {
    // Depends on if there are team members to add or not, and if the teacher is already registered
    if (teacherRegisterFormInput) {
      createTeacher({
        first_name: teacherRegisterFormInput.first_name,
        last_name: teacherRegisterFormInput.last_name,
        email: teacherRegisterFormInput.email,
        school_name: teacherRegisterFormInput.school_name,
        contact_number: teacherRegisterFormInput.contact_number,
        shirt_size: teacherRegisterFormInput.shirt_size,
      });
    }
  };

  const [currentStep, setCurrentStep] = React.useState(0);
  const steps = [
    {
      label: 'Register Teacher',
      component: (
        <RegisterTeacherForm
          setTeacherRegisterFormInput={setTeacherRegisterFormInput}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      label: 'Add Team Members',
      component: (
        <AddTeamForm
          setTeamInfo={setTeamInfo}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      label: 'Start Registration',
      component: (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Stack alignItems="center">
            <Spinner size="lg" />
            <Text fontSize="3xl">Registering teacher...</Text>
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
              <Text fontSize="3xl">Error registering teacher</Text>
              <Text fontSize="3xl">Please try again later!</Text>
            </Stack>
          )}
        </Box>
      ),
    },
  ];

  useEffect(() => {
    if (currentStep === 2) {
      handleRegistration();
    }
  }, [currentStep]);

  useEffect(() => {
    if (status !== 'pending') {
      setCurrentStep(3);
    }
  }, [status]);

  return <>{steps[currentStep].component}</>;
}
