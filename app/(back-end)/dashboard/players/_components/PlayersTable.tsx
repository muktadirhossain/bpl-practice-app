"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  User,
  Chip,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";

import AddPlayerModal from "./AddPlayerModal";

import SearchInput from "@/components/SearchInput";
import PaginationComponent from "@/components/PaginationComponent";

interface PlayersTableProps {
  players: string;
  totalPages?: number;
}

const columns = [
  {
    _id: "name",
    label: "NAME",
  },
  {
    _id: "player_type",
    label: "ROLE",
  },
  {
    _id: "status",
    label: "STATUS",
  },
  {
    _id: "actions",
    label: "ACTIONS",
  },
];

const PlayersTable: React.FC<PlayersTableProps> = ({ players, totalPages }) => {
  const users: [] = JSON.parse(players); // JSON.parse(players)

  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: user?.avatar,
            }}
            description={user?.player_type}
            name={cellValue}
          >
            {"subtitle"}
          </User>
        );
      case "player_type":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">
              {user.player_type}
            </p> */}
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={"primary"}
            size="sm"
            variant="flat"
          >
            Durbar Rajshahi
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // * TOP CONTENT ::
  const topContent = React.useMemo(() => {
    return (
      <div className="w-full flex justify-between items-center">
        <SearchInput />
        <AddPlayerModal />
      </div>
    );
  }, []);

  return (
    <Table
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
      <TableBody emptyContent={"No players found 😔"} items={users}>
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

export default PlayersTable;
