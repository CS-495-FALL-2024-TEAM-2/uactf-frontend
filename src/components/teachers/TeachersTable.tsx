import { TeacherInfo } from '@/types/userInfo.types';
import useScreenSize from '@/utils/getScreenSize';
import { Button, Input, Select, Text } from '@chakra-ui/react';
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import Link from 'next/link';
import React from 'react';

const columns = [
  { name: 'ID', uid: 'id' },
  { name: 'FIRST NAME', uid: 'first_name', sortable: true },
  { name: 'LAST NAME', uid: 'last_name', sortable: true },
  { name: 'SCHOOL NAME', uid: 'school_name', sortable: true },
  { name: 'SCHOOL ADDRESS', uid: 'school_address', sortable: true },
  { name: 'SCHOOL WEBSITE', uid: 'school_website', sortable: true },
  { name: 'SHIRT SIZE', uid: 'shirt_size', sortable: true },
  { name: 'CONTACT NUMBER', uid: 'contact_number', sortable: true },
  { name: 'VIEW DETAILS', uid: 'view_details' },
];

export default function TeachersTable({
  teachersData,
}: {
  teachersData: TeacherInfo[];
}) {
  const [filterValue, setFilterValue] = React.useState('');
  const [sortDescriptor, setSortDescriptor] = React.useState<
    SortDescriptor
  >({
    column: 'first_name',
    direction: 'ascending',
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const screenSize = useScreenSize();

  const visibleColumns =
    screenSize.width < 620
      ? ['first_name', 'last_name', 'school_name', 'shirt_size', 'view_details']
      : [
          'first_name',
          'last_name',
          'school_name',
          'school_address',
          'school_website',
          'shirt_size',
          'contact_number',
          'view_details',
        ];

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredTeachers = [...teachersData];

    if (filterValue) {
      filteredTeachers = filteredTeachers.filter(
        (teacher) =>
          teacher.first_name
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          teacher.last_name
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          teacher.school_name
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }
    return filteredTeachers;
  }, [filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort(
      (a: TeacherInfo, b: TeacherInfo) => {
        const first = a[
          sortDescriptor.column as keyof TeacherInfo
        ] as number | string;
        const second = b[
          sortDescriptor.column as keyof TeacherInfo
        ] as number | string;

        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      }
    );
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (teacherData: TeacherInfo, columnKey: React.Key) => {
      const cellValue = [columnKey as keyof TeacherInfo];

      switch (columnKey) {
        case 'first_name':
          return <div>{teacherData.first_name}</div>;
        case 'last_name':
          return <div>{teacherData.last_name}</div>;
        case 'school_name':
          return <div>{teacherData.school_name}</div>;
        case 'school_address':
          return <div>{teacherData.school_address}</div>;
        case 'school_website':
          return (
            <div
              className="underline cursor-pointer"
              onClick={() => {
                window.open(teacherData.school_website, '_blank');
              }}
            >
              Link
            </div>
          );
        case 'shirt_size':
          return <div>{teacherData.shirt_size}</div>;
        case 'contact_number':
          return <div>{teacherData.contact_number}</div>;
        case 'view_details':
          return (
            <Link href={`/teachers/${teacherData.id}`}>
              <Button colorScheme="blue" size="sm">View Details</Button>
            </Link>
          );
        default:
          return cellValue.toString();
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
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
      <div className="flex flex-col gap-4">
        <Input
          className="w-56"
          placeholder="Search by name and school name..."
          onChange={onSearchChange}
        ></Input>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {teachersData.length} teachers
          </span>
          <label className="flex items-center gap-2 text-default-400 text-small text-nowrap">
            Rows per page:
            <Select size={'sm'} onChange={onRowsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Select>
          </label>
        </div>
      </div>
    );
  }, [onSearchChange]);

  return (
    <div className="flex flex-col p-2 gap-5">
      <Table
        aria-label="Table listing teachers and their teams info"
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
              {column.name != "VIEW DETAILS" && column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="No teachers found"
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
