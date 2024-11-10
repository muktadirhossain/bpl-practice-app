"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
  Button,
} from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PaginationComponent from "@/components/PaginationComponent";
import SearchInput from "@/components/SearchInput";
import { EditIcon, EyeFilledIcon } from "@/components/icons";
import React from "react";
import UserModal from "./UserModal";

interface TableProps {
  data: string;
  totalPages?: number;
}

const columns = [
  {
    _id: "images",
    label: "IMAGES",
  },
  {
    _id: "name",
    label: "FULL NAME",
  },
  {
    _id: "email",
    label: "EMAIL",
  },
  {
    _id: "role",
    label: "USER ROLE",
  },
  {
    _id: "actions",
    label: "ACTIONS",
  },
];

const UsersTable: React.FC<TableProps> = ({ data, totalPages }) => {
  const users: [] = JSON.parse(data);

  const renderCell = React.useCallback((item: any, columnKey: any) => {
    switch (columnKey) {
      case "images":
        return (
          <Image
            alt={item?.name}
            className="h-12 w-12 block object-cover rounded-md"
            height={60}
            src={item?.image || "/assets/avatar.svg"}
            width={60}
          />
        );
      case "name":
        return item?.name;
      case "email":
        return item?.email;

      case "role":
        return <Chip className="capitalize" color="warning" size="sm" variant="flat">{item?.role}</Chip>;
      
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <UserModal user={item}/>
          </div>
        );
      default:
        return <span>unknown field</span>;
    }
  }, []);

  // * TOP CONTENT ::
  const topContent = React.useMemo(() => {
    return (
      <div className="w-full flex justify-between items-center">
        {/*  */}
        <div className="flex w-2/3 gap-x-4 items-center">
          {/* <CategoryFilter categories={categories} /> */}
          <SearchInput />
        </div>
      </div>
    );
  }, []);

  return (
    <Table
      isStriped
      aria-label="Players Table"
      bottomContent={
        <PaginationComponent limit={10} total={Number(totalPages)} />
      }
      bottomContentPlacement="outside"
      className="my-5"
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column._id}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No Products Found 😔"} items={users}>
        {(item: any) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
