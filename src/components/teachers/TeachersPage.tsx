'use client';

import { NextUIProvider } from '@nextui-org/system';
import TeachersTable from './TeachersTable';
import { useGetTeachers } from '@/hooks/teachers.hooks';
import { Spinner } from '@chakra-ui/react';

export default function TeachersPage() {
  const { data, isPending } = useGetTeachers();
  const teachersData = data?.teachers || [];

  if (isPending) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <NextUIProvider>
      <div className="flex flex-col justify-center p-4">
        <TeachersTable teachersData={teachersData}/>
      </div>
    </NextUIProvider>
  );
}
