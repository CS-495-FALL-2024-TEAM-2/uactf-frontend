import { TeamData, TeamWithStudents } from '@/types/teams.types';
import { StudentInfo } from '@/types/userInfo.types';
import useScreenSize from '@/utils/getScreenSize';
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
} from '@chakra-ui/react';
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import NextLink from 'next/link';
import React, { useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useDeleteTeam } from '@/hooks/teams.hooks';
import { useUploadSignedLiabilityForm } from '@/hooks/teachers.hooks';

const columns = [
  { name: 'FIRST NAME', uid: 'first_name', sortable: true },
  { name: 'LAST NAME', uid: 'last_name', sortable: true },
  { name: 'SHIRT SIZE', uid: 'shirt_size', sortable: true },
  { name: 'VERIFIED', uid: 'is_verified' },
  { name: 'UPLOAD LIABILITY FORM', uid: 'upload_liability_form' },
];

export default function TeamTable({
  teamData,
  refetchTeams,
}: {
  teamData: TeamWithStudents;
  refetchTeams: () => void;
}) {
  const toast = useToast();
  const membersData = teamData.students;

  const [filterValue, setFilterValue] = React.useState('');
  const [sortDescriptor, setSortDescriptor] = React.useState<
    SortDescriptor
  >({
    column: 'name',
    direction: 'ascending',
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const [isConfirmFormModalOpen, setIsConfirmFormModalOpen] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [liabilityReleaseFormUploadedInfo, setLiabilityReleaseFormUploadedInfo] =  React.useState<{file: File; student: StudentInfo;} | null>(null);

  const { mutate: deleteTeam } = useDeleteTeam(
    (data) => {
      refetchTeams();
      toast({
        title: 'Team deleted',
        position: 'top',
        description: 'Team has been deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    (error) => {
      toast({
        title: 'Error deleting team',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  );

  const { mutate: uploadSignedLiabilityForm, isPending: uploadSignedLiabilityFormIsPending } = useUploadSignedLiabilityForm(
    (data) => {
      setIsConfirmFormModalOpen(false);
      refetchTeams();
      toast({
        title: 'Form uploaded',
        position: 'top',
        description: 'Form has been uploaded and is in queue for approval',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    (error) => {
      toast({
        title: 'Error uploading form',
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
      ? ['first_name', 'last_name', 'is_verified', 'upload_liability_form']
      : ['first_name', 'last_name', 'shirt_size', 'is_verified', 'upload_liability_form'];

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
  }, [filterValue, membersData]);

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
        case 'upload_liability_form':
          return (
            <div>
              {membersData.signed_liability_release_form && 
                <Link 
                  target="_blank" 
                  href={membersData.signed_liability_release_form} 
                  color='teal.500' 
                  className='mr-2'
                >
                  Uploaded form
                </Link>}
              <input 
                type="file" 
                className="file:cursor-pointer w-max file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold" 
                name="liability_release_form"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0){
                    console.log(e.target.files)
                    setLiabilityReleaseFormUploadedInfo({
                      file: e.target.files[0],
                      student: membersData
                    });
                    setIsConfirmFormModalOpen(true);
                  }

                }}
              />
            </div>
          );
        default:
          return cellValue ? cellValue.toString() : '';
      }
    },
    [fileInputRef.current, membersData]
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue('');
    }
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-row justify-around gap-2">
        <Input
          placeholder="Search by name..."
          onChange={onSearchChange}
        />
        <NextLink href={`/teams/update/${teamData.id}`}>
          <Button>Edit Team</Button>
        </NextLink>
        <Button colorScheme="red" onClick={() => setIsOpen(true)}>
          Delete Team
        </Button>
      </div>
    );
  }, [onSearchChange]);

  const deleteModal = React.useMemo(() => {
    return (
      <div>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Team</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete this team?</Text>
            </ModalBody>

            <ModalFooter>
              <div className="flex flex-row gap-2">
                <Button
                  colorScheme="red"
                  onClick={() => {
                    deleteTeam(teamData.id);
                    setIsOpen(false);
                  }}
                >
                  Delete
                </Button>
                <Button
                  colorScheme="gray"
                  mr={3}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }, [isOpen]);

  const confirmLiabilityReleaseFormUploadModal = React.useMemo(() => {
    return (
      <div>
        <Modal isOpen={isConfirmFormModalOpen} onClose={() => setIsConfirmFormModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload Signed Liability Release Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to upload this signed liability release form for this student?</Text>
              <Text><b>Student name:</b> {liabilityReleaseFormUploadedInfo?.student.first_name} {liabilityReleaseFormUploadedInfo?.student.last_name}</Text>
              <Text><b>File name:</b> {liabilityReleaseFormUploadedInfo?.file.name}</Text>
            </ModalBody>

            <ModalFooter>
              <div className="flex flex-row gap-2">
                <Button
                  colorScheme="green"
                  isLoading={uploadSignedLiabilityFormIsPending}
                  onClick={() => {
                    if (liabilityReleaseFormUploadedInfo){
                      uploadSignedLiabilityForm({
                        student_id: liabilityReleaseFormUploadedInfo.student.id ?? "",
                        signed_liability_release_form: liabilityReleaseFormUploadedInfo.file
                      });
                    }
                  }}
                >
                  Upload
                </Button>
                <Button
                  colorScheme="gray"
                  mr={3}
                  onClick={() => {
                    setLiabilityReleaseFormUploadedInfo(null);
                    setIsConfirmFormModalOpen(false);
                    console.log(fileInputRef)
                    if (fileInputRef.current){
                      fileInputRef.current.value = "";
                    }
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
  }, [isConfirmFormModalOpen, uploadSignedLiabilityFormIsPending]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Text fontSize="2xl" as="b">
          {teamData.name}
        </Text>
        <Tag>{`${
          teamData.is_virtual ? 'Virtual' : 'In Person'
        }`}</Tag>
        {teamData.division.map((div, index) => (
          <Tag key={index}>Division {div}</Tag>
        ))}
      </div>
      <Table
        aria-label="Table listing team members info"
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
          emptyContent="No team members found"
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
      {deleteModal}
      {confirmLiabilityReleaseFormUploadModal}
    </div>
  );
}
