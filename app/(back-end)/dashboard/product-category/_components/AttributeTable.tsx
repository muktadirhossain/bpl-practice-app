"use client";
import { useMemo, useCallback } from "react";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import dayjs from "dayjs";
import AddAttributeModal from "./AddAttibuteModal";
import DeleteAttributeButton from "./DeleteAttributeButton";
import ConfigureModal from "./ConfigureModal";
import { Span } from "next/dist/trace";
import AttributeValue from "./AttributeValue";

interface NewsCategoryTableProps {
  data?: string;
  totalPages?: number;
}

const columns = [
  {
    _id: "createdAt",
    label: "DATE",
    sortable: true,
  },
  {
    _id: "_id",
    label: "ID",
  },
  {
    _id: "name",
    label: "ATTRIBUTE",
  },
  {
    _id: "values",
    label: "ATTRIBUTE VALUES",
  },
  {
    _id: "actions",
    label: "ACTIONS",
  },
];

const AttributeTable: React.FC<NewsCategoryTableProps> = ({
  data = "[]",
  totalPages = 1,
}: any) => {
  // parse data from parent
  const tableData = JSON?.parse(data);

  const renderCell = useCallback((item: any, columnKey: any) => {
    switch (columnKey) {
      case "_id":
        return <p className="capitalize text-xs">{item?._id}</p>;
      case "createdAt":
        return (
          <p className="capitalize text-xs">
            {dayjs(item?.createdAt).format("DD MMM YYYY")}
          </p>
        );
      case "values":
        return (
          <div className="space-x-1">
            {item?.values?.length > 0 ? (item?.values?.map((value: any) => (
              <AttributeValue key={value?._id} attributeVal={value}/>
            ))): <span>N/A</span>}
          </div>
        );

      case "name":
        return <p className="capitalize">{item?.name}</p>;

      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Edit attribute">
              <ConfigureModal attribute={item?.name} id={item?._id} />
            </Tooltip>
            <Tooltip color="danger" content="Delete attribute">
              <DeleteAttributeButton id={item?._id} />
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
        <AddAttributeModal />
      </div>
    );
  }, []);

  const onSortChange = (descriptor: any) => {
    console.log(descriptor);
  };

  return (
    <Table
      aria-label="Product Category Table"
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
      <TableBody emptyContent={"No Attributes found 😔"} items={tableData}>
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

export default AttributeTable;
