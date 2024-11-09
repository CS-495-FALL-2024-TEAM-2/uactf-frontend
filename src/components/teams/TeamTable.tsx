import { TeamData } from '@/types/teams.types';
import { StudentInfo } from '@/types/userInfo.types';
import useScreenSize from '@/utils/getScreenSize';
import { membersData } from '@/utils/mockData/teamsData';
import { Input, Text } from '@chakra-ui/react';
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import React from 'react';

const columns = [
  { name: 'FIRST NAME', uid: 'first_name', sortable: true },
  { name: 'LAST NAME', uid: 'last_name', sortable: true },
  { name: 'SHIRT SIZE', uid: 'shirt_size', sortable: true },
  { name: 'VERIFIED', uid: 'is_verified' },
];

export default function TeamTable({
  teamData,
}: {
  teamData: TeamData;
}) {
  const mockMembers: StudentInfo[] = membersData;

  const [filterValue, setFilterValue] = React.useState('');
  const [sortDescriptor, setSortDescriptor] = React.useState<
    SortDescriptor
  >({
    column: 'name',
    direction: 'ascending',
  });

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
    let filteredMembers = [...mockMembers];

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

  const topContent = React.useMemo(() => {
    return (
      <div className="w-48">
        <Input
          className="w-full"
          placeholder="Search by name..."
          onChange={onSearchChange}
        />
      </div>
    );
  }, [onSearchChange]);

  return (
    <div className="p-2">
      <Text fontSize="2xl" as="b">{teamData.name}</Text>
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
    </div>
  );
}
