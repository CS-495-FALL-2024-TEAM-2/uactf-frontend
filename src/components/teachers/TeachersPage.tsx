'use client';

import { NextUIProvider } from '@nextui-org/system';
import TeachersTable from './TeachersTable';
import { teachersTeamsData } from '@/utils/mockData/teachersData';

export default function TeachersPage() {
  const mockTeachers = teachersTeamsData;

  return (
    <NextUIProvider>
      <div className="flex flex-col justify-center p-4">
        <TeachersTable teachersList={mockTeachers}/>
      </div>
    </NextUIProvider>
  );
}
