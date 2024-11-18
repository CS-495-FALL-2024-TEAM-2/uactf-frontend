'use client';

import { useGetChallenges } from '@/hooks/challenges.hooks';
import ChallengesTable from './ChallengesTable';
import { useGetStudentsToBeVerified } from '@/hooks/admin.hooks';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, SortDescriptor } from '@nextui-org/table';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import useScreenSize from '@/utils/getScreenSize';
import React from 'react';
import { StudentInfo } from '@/types/userInfo.types';
import { membersData } from '@/utils/mockData/teamsData';

const columns = [
    { name: 'FIRST NAME', uid: 'first_name', sortable: true },
    { name: 'LAST NAME', uid: 'last_name', sortable: true },
    { name: 'SHIRT SIZE', uid: 'shirt_size', sortable: true },
    { name: 'VERIFIED', uid: 'is_verified' },
    { name: 'SIGNED FORM', uid: 'signed_liability_release_form' },
    { name: '', uid: 'approve_form' },
  ];

export default function ApproveSignedLiabilityReleaseFormPage() {
  const { isPending, error, data } = useGetStudentsToBeVerified();

  const toast = useToast();
  const [filterValue, setFilterValue] = useState('');
  const [sortDescriptor, setSortDescriptor] = React.useState<
    SortDescriptor
  >({
    column: 'name',
    direction: 'ascending',
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const screenSize = useScreenSize();

  const visibleColumns =
    screenSize.width < 620
      ? ['first_name', 'last_name', 'is_verified']
      : ['first_name', 'last_name', 'shirt_size', 'is_verified'];

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredMembers = [...membersData];

    if (filterValue) {
      filteredMembers = filteredMembers.filter(
        (member) =>
          member.first_name
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          member.last_name
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }
    return filteredMembers;
  }, [filterValue]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort(
      (a: StudentInfo, b: StudentInfo) => {
        const first = a[
          sortDescriptor.column as keyof StudentInfo
        ] as number;
        const second = b[
          sortDescriptor.column as keyof StudentInfo
        ] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      }
    );
  }, [sortDescriptor, filteredItems]);

  const renderCell = React.useCallback(
    (membersData: StudentInfo, columnKey: React.Key) => {
      const cellValue = membersData[columnKey as keyof StudentInfo];

      switch (columnKey) {
        case 'first_name':
          return <div>{membersData.first_name}</div>;
        case 'last_name':
          return <div>{membersData.last_name}</div>;
        case 'shirt_size':
          return <div>{membersData.shirt_size}</div>;
        case 'is_verified':
          return (
            <div>
              {membersData.is_verified ? 'Verified' : 'Not Verified'}
            </div>
          );
        default:
          return cellValue.toString();
      }
    },
    []
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue('');
    }
  };

  if (isPending)
    return (
      <div className="flex justify-center items-center h-100 text-bold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-100 text-bold">
        Error: {error.message}
      </div>
    );

  return (
    <div>
        <Table
            aria-label="Table listing students waiting to be verified"
            isHeaderSticky
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
            selectionMode="single"
        >
            <TableHeader columns={headerColumns}>
            {(column) => (
                <TableColumn
                key={column.uid}
                align="start"
                allowsSorting={column.sortable}
                >
                {column.name}
                </TableColumn>
            )}
            </TableHeader>
            <TableBody
            emptyContent="No students waiting to be approved"
            items={sortedItems}
            >
            {(item) => (
                <TableRow key={item.id}>
                {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
                </TableRow>
            )}
            </TableBody>
        </Table>
    </div>
    
  );
}
