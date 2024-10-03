'use client';

import React, { useEffect } from 'react';
import { AddTeamFormData, CreateStudentFormData, TeacherRegisterFormData } from '@/types/forms.types';
import RegisterTeacherForm from './RegisterTeacherForm';
import AddTeamForm from '../AddTeamForm';

export default function RegisterTeacher() {
  const [
    teacherRegisterFormInput,
    setTeacherRegisterFormInput,
  ] = React.useState<TeacherRegisterFormData | null>(null);
  const [teamInfo, setTeamInfo] = React.useState<AddTeamFormData | null>(null);

  const handleRegistration = () => {
    // TODO: Implement registration
    // Depends on if there are team members to add or not, and if the teacher is already registered
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
      component: <AddTeamForm setTeamInfo={setTeamInfo} setCurrentStep={setCurrentStep} />,
    },
    {
      label: 'Start Registration',
      component: <div>Done Registering. Please check your email</div>,
    }
  ];

  useEffect(() => {
    if (currentStep === steps.length) {
      handleRegistration();
    }
  }, [currentStep]);

  return (
    <>
      {steps[currentStep].component}
    </>
  );
}
