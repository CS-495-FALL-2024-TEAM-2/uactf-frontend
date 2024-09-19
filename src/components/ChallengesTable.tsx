"use client"
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  SortDescriptor
} from "@nextui-org/table";
import {
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/dropdown";
import {Pagination} from "@nextui-org/pagination"
import { Button, Input, Select } from "@chakra-ui/react";
import { mockChallenges } from "../utils/mockData/challengesData";
import { challenges, columns } from "../types/challenges.types";

const challengesData = mockChallenges;

//set visible columns, for hiding IDs, sensistive info
const visibleColumns = ["name", "category", "description", "points"];

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredChallenges = [...challengesData];

    if (hasSearchFilter) {
        filteredChallenges = filteredChallenges.filter((challenge) =>
            challenge.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            challenge.category.toLowerCase().includes(filterValue.toLowerCase()) ||
            challenge.description.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredChallenges;
  }, [challengesData, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: challenges, b: challenges) => {
      const first = a[sortDescriptor.column as keyof challenges] as number;
      const second = b[sortDescriptor.column as keyof challenges] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((challengesData: challenges, columnKey: React.Key) => {
    const cellValue = challengesData[columnKey as keyof challenges];

    switch (columnKey) {
      case "name":
        return (
          <div>
            {challengesData.name}
          </div>
        );
      case "category":
        return (
          <div>
            {challengesData.category}
          </div>
        );
      case "description":
        return (
          <div className="truncate max-w-xs md:max-w-md lg:max-w-lg">
            {challengesData.description}
          </div>
        );
      case "points":
        return (
          <div>
            {challengesData.points}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = (event: any) => {
    const value = event.target.value;
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            className="w-full"
            placeholder="Search by name..."
            onChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectionMode="multiple"
              >
                {[1, 2].map((status) => (
                  <DropdownItem key={status} className="capitalize">
                    {status}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* TODO: add a condition for if user does not access to edit challenges when auth is set up */}
            {true ?
            <Button color="primary">
              Add New Challenge
            </Button>
            : ''}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {challengesData.length} challenges</span>
          <label className="flex items-center text-default-400 text-small text-nowrap">
            Rows per page:
            <Select
              size={'sm'}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    challengesData.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          page={page}
          total={pages}
          onChange={setPage}
          color="default"
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="p-4">
      <Table
        aria-label="Table listing all challenges with pagination and sorting available"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
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
        <TableBody emptyContent={"No challenges found"} items={sortedItems}>
            {(item) => (
            <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
            )}
        </TableBody>
        </Table>
    </div>
  );
}
