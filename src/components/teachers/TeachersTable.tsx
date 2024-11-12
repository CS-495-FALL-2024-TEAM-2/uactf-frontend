import { TeacherInfo } from '@/types/userInfo.types';
import useScreenSize from '@/utils/getScreenSize';
import { Input } from '@chakra-ui/react';
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
  { name: 'ID', uid: 'id' },
  { name: 'FIRST NAME', uid: 'first_name', sortable: true },
  { name: 'LAST NAME', uid: 'last_name', sortable: true },
  { name: 'SCHOOL NAME', uid: 'school_name', sortable: true },
  { name: 'SHIRT SIZE', uid: 'shirt_size', sortable: true },
  { name: 'CONTACT NUMBER', uid: 'contact_number', sortable: true },
  { name: 'EMAIL', uid: 'email', sortable: true },
];

export default function TeachersTable({
  teachersList,
}: {
  teachersList: TeacherInfo[];
}) {
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
      ? ['first_name', 'last_name', 'school_name', 'shirt_size']
      : [
          'first_name',
          'last_name',
          'school_name',
          'shirt_size',
          'contact_number',
          'email',
        ];

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredTeachers = [...teachersList];

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

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort(
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
  }, [sortDescriptor, filteredItems]);

  const renderCell = React.useCallback(
    (teachersData: TeacherInfo, columnKey: React.Key) => {
      const cellValue = [columnKey as keyof TeacherInfo];

      switch (columnKey) {
        case 'first_name':
          return <div>{teachersData.first_name}</div>;
        case 'last_name':
          return <div>{teachersData.last_name}</div>;
        case 'school_name':
          return <div>{teachersData.school_name}</div>;
        case 'shirt_size':
          return <div>{teachersData.shirt_size}</div>;
        case 'contact_number':
          return <div>{teachersData.contact_number}</div>;
        case 'email':
          return <div>{teachersData.email}</div>;
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
      <div>
        <Input
          className="w-48"
          placeholder="Search by name and school name..."
          onChange={onSearchChange}
        ></Input>
      </div>
    );
  }, [onSearchChange]);

  return (
    <div className="p-2">
      <Table
        aria-label="Table listing teachers and their teams info"
        isHeaderSticky
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
        selectionMode="single"
        onSelectionChange={(selected) =>
          selected !== undefined
            ? console.log(
                'See teams for',
                new Set(selected).values().next().value
              )
            : null
        }
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
