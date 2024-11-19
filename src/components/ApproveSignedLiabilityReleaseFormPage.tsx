'use client';

import { useGetStudentsToBeVerified, useVerifyStudent } from '@/hooks/admin.hooks';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, SortDescriptor } from '@nextui-org/table';
import { Text, Button, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import useScreenSize from '@/utils/getScreenSize';
import React from 'react';
import { StudentInfo } from '@/types/userInfo.types';

const columns = [
    { name: 'FIRST NAME', uid: 'first_name', sortable: true },
    { name: 'LAST NAME', uid: 'last_name', sortable: true },
    { name: 'SHIRT SIZE', uid: 'shirt_size', sortable: true },
    { name: 'VERIFIED', uid: 'is_verified' },
    { name: 'SIGNED FORM', uid: 'signed_liability_release_form' },
    { name: 'APPROVE FORM', uid: 'approve_form' },
  ];

export default function ApproveSignedLiabilityReleaseFormPage() {
  const { isPending, error, data, refetchStudentsToBeVerified } = useGetStudentsToBeVerified();

  const toast = useToast();
  const [filterValue, setFilterValue] = useState('');
  const [isConfirmApprovalModalOpen, setIsConfirmApprovalModalOpen] = React.useState(false);
  const [studentToVerify, setStudentToVerify] = React.useState<StudentInfo | null>(null);
  const [sortDescriptor, setSortDescriptor] = React.useState<
    SortDescriptor
  >({
    column: 'name',
    direction: 'ascending',
  });

  const { mutate: verifyStudent, isPending: verifyStudentIsPending } = useVerifyStudent(
    (data) => {
        setIsConfirmApprovalModalOpen(false);
        refetchStudentsToBeVerified();
        toast({
            title: 'Approval successful',
            position: 'top',
            description: 'Form has been approved successfully!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    },
    (error) => {
      toast({
        title: 'Error approving form',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  ); 

  const screenSize = useScreenSize();

  const visibleColumns =
    screenSize.width < 620
      ? ['first_name', 'last_name', 'signed_liability_release_form', 'approve_form']
      : ['first_name', 'last_name', 'signed_liability_release_form', 'approve_form'];

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredMembers: StudentInfo[] = [];
    if (data){
        filteredMembers = [...data.students];

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
    }
    
    return filteredMembers;
  }, [filterValue, data]);

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
        case 'signed_liability_release_form':
            return (
                <Link 
                    href={membersData.signed_liability_release_form}
                    color="teal.500"
                    target="_blank"
                >
                    Open signed form
                </Link>
            )
        case 'approve_form':
            return (
                <Button 
                    colorScheme="blue"
                    onClick={() => {
                        setStudentToVerify(membersData);
                        setIsConfirmApprovalModalOpen(true);
                    }}
                >
                    Approve liability form
                </Button>
            )
        default:
          return cellValue ? cellValue.toString() : '';
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

  const confirmFormApprovalModal = React.useMemo(() => {
    return (
        <div>
            <Modal isOpen={isConfirmApprovalModalOpen} onClose={() => setIsConfirmApprovalModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Approve Signed Liability Release Form</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Text>Are you sure you want to approve this signed liability release form for this student?</Text>
                </ModalBody>

                <ModalFooter>
                <div className="flex flex-row gap-2">
                    <Button
                        colorScheme="blue"
                        isLoading={verifyStudentIsPending}
                        onClick={() => {
                            if (studentToVerify){
                                verifyStudent(studentToVerify.id);
                            }
                        }}
                    >
                        Approve
                    </Button>
                    <Button
                        colorScheme="gray"
                        mr={3}
                        onClick={() => {
                            setStudentToVerify(null);
                            setIsConfirmApprovalModalOpen(false);
                        }}
                    >
                    Cancel
                    </Button>
                </div>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </div>
    );
    }, [isConfirmApprovalModalOpen, verifyStudentIsPending]);

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
        {confirmFormApprovalModal}
    </div>
    
  );
}
