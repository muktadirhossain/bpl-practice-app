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
  Chip,
  Button,
} from "@nextui-org/react";
import { PlusIcon, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CategoryFilter from "./CategoryFilter";
import DeleteProductButton from "./DeleteProductButton";
import PaginationComponent from "@/components/PaginationComponent";
import SearchInput from "@/components/SearchInput";
import { EditIcon, EyeFilledIcon } from "@/components/icons";

interface TableProps {
  data: string;
  totalPages?: number;
  categories?: string;
}

const columns = [
  {
    _id: "images",
    label: "IMAGES",
  },
  {
    _id: "title",
    label: "PRODUCT",
  },
  {
    _id: "itemCode",
    label: "CODE",
  },
  {
    _id: "price",
    label: "PRICE",
  },
  {
    _id: "category",
    label: "CATEGORY",
  },
  {
    _id: "actions",
    label: "ACTIONS",
  },
];

const ProductsTable: React.FC<TableProps> = ({
  data,
  totalPages,
  categories,
}) => {
  const users: [] = JSON.parse(data);

  const renderCell = React.useCallback((item: any, columnKey: any) => {
    switch (columnKey) {
      case "images":
        return (
          <Image
            alt={item?.title}
            className="h-12 w-12 block object-cover rounded-md"
            height={60}
            src={item.images[0]}
            width={60}
          />
        );
      case "title":
        return <span>{item?.title}</span>;
      case "itemCode":
        return <span>{item?.itemCode}</span>;
      case "price":
        return (
          <span className="text-durbarDeep text-semibold">
            {item?.price} Tk
          </span>
        );
      case "category":
        return (
          <Chip className="capitalize" color="warning" size="sm" variant="flat">
            {item?.category?.category}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={`/dashboard/shop/product-configure/${item?._id}`}>
              <Tooltip color="secondary" content="Configure Variants">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Settings className="text-durbarDeep h-4 w-4"/>
                </span>
              </Tooltip>
            </Link>
            <Link href={`/dashboard/shop/product-details/${item?._id}`}>
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeFilledIcon />
                </span>
              </Tooltip>
            </Link>
            <Link href={`/dashboard/shop/edit-product/${item?._id}`}>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
            </Link>
            <DeleteProductButton productId={item?._id} />
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
          <CategoryFilter categories={categories} />
          <SearchInput />
        </div>

        {/*  */}
        <Link href={"/dashboard/shop/add-products"}>
          <Button color="warning" startContent={<PlusIcon />}>
            Add Product
          </Button>
        </Link>
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

export default ProductsTable;
