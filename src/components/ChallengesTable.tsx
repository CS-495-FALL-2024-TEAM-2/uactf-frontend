"use client"
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SortDescriptor,
  Selection
} from "@nextui-org/table";
import {
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/dropdown";
import {Pagination} from "@nextui-org/pagination"
import { Button, Input, Select } from "@chakra-ui/react";
import { mockChallenges } from "../utils/mockData/challengesData";
import { columns, listChallenges } from "../types/challenges.types";
import Link from "next/link";
import useScreenSize from "@/utils/getScreenSize";
import { useRouter } from "next/navigation";

const challengesData: listChallenges[] = mockChallenges.map((challenge) => ({
  "challenge_id": challenge.challenge_id,
  "challenge_name": challenge.challenge_name,
  "category": challenge.category,
  "challenge_description": challenge.challenge_description,
  "points": challenge.points,
  "division" :challenge.division,
}));

//set visible columns, for hiding IDs, sensistive info
let visibleColumns: string[] = ["name", "category", "points"];
const divisionOptions = [1,2]

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [divisionFilter, setDivisionFilter] = React.useState<Selection>("all");
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const screenSize = useScreenSize();
  const router = useRouter();

  visibleColumns = screenSize.width < 620 ? ["name", "category", "points"] : ["name", "category", "description", "points"];

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredChallenges = [...challengesData];

    if (hasSearchFilter) {
        filteredChallenges = filteredChallenges.filter((challenge) =>
            challenge.challenge_name.toLowerCase().includes(filterValue.toLowerCase()) ||
            challenge.category.toLowerCase().includes(filterValue.toLowerCase()) ||
            challenge.challenge_description.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (divisionFilter !== "all" && Array.from(divisionFilter).length !== divisionOptions.length) {
      filteredChallenges = filteredChallenges.filter((challenge) =>
        challenge.division.some(div => Array.from(divisionFilter).includes(div.toString()))
      );
    }
    return filteredChallenges;
  }, [challengesData, filterValue, divisionFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: listChallenges, b: listChallenges) => {
      const first = a[sortDescriptor.column as keyof listChallenges] as number;
      const second = b[sortDescriptor.column as keyof listChallenges] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((challengesData: listChallenges, columnKey: React.Key) => {
    const cellValue = challengesData[columnKey as keyof listChallenges];

    switch (columnKey) {
      case "name":
        return (
          <div>
            {challengesData.challenge_name}
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
          <div className="truncate max-w-xs md:max-w-md lg:max-w-xl">
            {challengesData.challenge_description}
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
                <Button variant="flat" className="z-0">
                  Division
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={divisionFilter}
                selectionMode="multiple"
                onSelectionChange={setDivisionFilter}
              >
                {divisionOptions.map((division) => (
                  <DropdownItem key={division} textValue={division.toString()} className="capitalize">
                    {division}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* TODO: add a condition for if user does not access to edit challenges when auth is set up */}
            {true ?
            <Link href="/challenges/add">
              <Button color="primary">
                Add New Challenge
              </Button>
            </Link>
            : ''}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {challengesData.length} challenges</span>
          <label className="flex items-center gap-2 text-default-400 text-small text-nowrap">
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
    divisionFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    challengesData.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex w-full items-center justify-center">
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
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <div className="p-4">
      <Table
        aria-label="Table listing all challenges with pagination and sorting available"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
        selectionMode="single" 
        onSelectionChange={(selected) => router.push(`/challenges/view/${new Set(selected).values().next().value}`)}
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
            <TableRow key={item.challenge_id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
            )}
        </TableBody>
        </Table>
    </div>
  );
}
