"use client";
import { useMemo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import dayjs from "dayjs";

import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCategoryButton from "./DeleteCategoryButton";

import SearchInput from "@/components/SearchInput";
import PaginationComponent from "@/components/PaginationComponent";

interface NewsCategoryTableProps {
  data: string;
  totalPages?: number;
}

const columns = [
  {
    _id: "_id",
    label: "ID",
  },
  {
    _id: "category",
    label: "CATEGORY NAME",
    sortable: true,
  },
  {
    _id: "createdAt",
    label: "DATE",
    sortable: true,
  },
  {
    _id: "actions",
    label: "ACTIONS",
  },
];

const ProductCategoryTable: React.FC<NewsCategoryTableProps> = ({
  data,
  totalPages,
}: any) => {
  // parse data from parent
  const tableData = JSON?.parse(data);

  const renderCell = useCallback((item: any, columnKey: any) => {
    switch (columnKey) {
      case "_id":
        return <p className="capitalize">{item?._id}</p>;
      case "category":
        return <p className="capitalize">{item?.category}</p>;
      case "createdAt":
        return (
          <p className="capitalize">
            {dayjs(item?.createdAt).format("DD MMM YYYY")}
          </p>
        );

      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Edit category">
              <UpdateCategoryModal category={item?.category} id={item?._id} />
            </Tooltip>
            <Tooltip color="danger" content="Delete category">
              <DeleteCategoryButton id={item?._id} />
            </Tooltip>
          </div>
        );
      default:
        return columnKey;
    }
  }, []);

  // * TOP CONTENT ::
  const topContent = useMemo(() => {
    return (
      <div className="w-full flex justify-between items-center">
        <SearchInput />
        <AddCategoryModal />
      </div>
    );
  }, []);

  const onSortChange = (descriptor: any) => {
    console.log(descriptor);
  };

  return (
    <Table
      aria-label="Product Category Table"
      bottomContent={
        <PaginationComponent limit={10} total={Number(totalPages)} />
      }
      bottomContentPlacement="outside"
      className="my-5"
      isStriped={true}
      sortDescriptor={{ column: "name", direction: "descending" }}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={onSortChange}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column._id}
            align={column._id === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No Products Category found 😔"}
        items={tableData}
      >
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

export default ProductCategoryTable;
