"use client";
import { Button, ButtonGroup, Card, CardBody } from "@nextui-org/react";

import { DeleteIcon, EditIcon } from "@/components/icons";
import { getRelativeTime } from "@/utils/convert-data";

interface ActionButtonProps {
  productId: string;
  category: string;
  date: string;
}

const ActionButtons = ({ productId, category, date }: ActionButtonProps) => {
  return (
    <Card className="my-5">
      <CardBody>
        <div className="flex justify-between items-center">
          <div>
            <strong>Category:</strong>{" "}
            <span className="capitalize text-gradient">{category}</span>
            <br />
            <span className="opacity-80">{getRelativeTime(date)}</span>
          </div>
          <ButtonGroup>
            <Button color="warning" startContent={<EditIcon />}>
              Edit
            </Button>
            <Button color="danger" endContent={<DeleteIcon />}>
              Delete
            </Button>
          </ButtonGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default ActionButtons;
