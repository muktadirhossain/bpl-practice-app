"use client";
import { useMemo, useCallback } from "react";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

import { deleteNewsAction } from "@/app/actions/news-actions";
import { DeleteIcon, EditIcon, VerticalDotsIcon } from "@/components/icons";
import SearchInput from "@/components/SearchInput";
import PaginationComponent from "@/components/PaginationComponent";

interface NewsTableProps {
  data: string;
  totalPages?: number;
}

const columns = [
  {
    _id: "cover_photo",
    label: "Cover Photo",
  },
  {
    _id: "createdAt",
    label: "Published At",
  },
  {
    _id: "category",
    label: "Category",
  },
  {
    _id: "headline",
    label: "Headline",
  },
  {
    _id: "actions",
    label: "ACTIONS",
  },
];

const NewsTable: React.FC<NewsTableProps> = ({ data, totalPages }: any) => {
  // parse data from parent
  const tableData = JSON?.parse(data);
  const router = useRouter();

  const deleteHandler = useCallback(async (id: string) => {
    try {
      const res = await deleteNewsAction(id);

      if (res?.success) {
        toast.success(res.message);
      }

      if (!res?.success) {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  }, []);

  const navigateToEditPage = useCallback(async (id: string) => {
    router.push(`/dashboard/news/edit-news/${id}`);
  }, []);
  const navigateToViewPage = useCallback(async (id: string) => {
    router.push(`/durbar-news/${id}`);
  }, []);

  const renderCell = useCallback((item: any, columnKey: any) => {
    switch (columnKey) {
      case "createdAt":
        return <p>{dayjs(item?.createdAt).format("DD MMM YY")}</p>;

      case "headline":
        return item?.headline;
      case "category":
        return (
          <Chip color="warning" variant="faded">
            {item?.category?.category}
          </Chip>
        );

      case "cover_photo":
        return (
          <Image
            alt={item?.headline}
            className="rounded-lg"
            height={70}
            src={item?.cover_photo}
            width={70}
          />
        );

      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="view"
                  className="text-white"
                  color="warning"
                  description="View News"
                  endContent={
                    <Button
                      isIconOnly
                      color="secondary"
                      size="sm"
                      startContent={<EditIcon />}
                    />
                  }
                  title="View"
                  onPress={() => navigateToViewPage(item?.slug)}
                />
                <DropdownItem
                  key="edit"
                  className="text-white"
                  color="warning"
                  description="Edit News"
                  endContent={
                    <Button
                      isIconOnly
                      color="warning"
                      size="sm"
                      startContent={<EditIcon />}
                    />
                  }
                  title="Edit"
                  onPress={() => navigateToEditPage(item?.slug)}
                />
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  description="Delete news"
                  endContent={
                    <Button
                      isIconOnly
                      color="danger"
                      size="sm"
                      startContent={<DeleteIcon />}
                    />
                  }
                  title="Delete"
                  onClick={() => deleteHandler(item?._id)}
                />
              </DropdownMenu>
            </Dropdown>
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

        <Button
          color="warning"
          startContent={<CirclePlus className="h-4 w-4" />}
          variant="shadow"
          onPress={() => router.push("/dashboard/news/create-news")}
        >
          Add News
        </Button>
      </div>
    );
  }, []);

  const onSortChange = (descriptor: any) => {
    console.log(descriptor);
  };

  return (
    <Table
      aria-label="News Table"
      bottomContent={
        <PaginationComponent limit={10} total={Number(totalPages || 0)} />
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
            // allowsSorting={column.sortable}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No News found 😔"} items={tableData}>
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

export default NewsTable;
