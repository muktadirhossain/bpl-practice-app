"use client";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";

import { deleteSponsorType } from "@/app/actions/sponsorship-actions";

export default function SponsorTypeDeleteButton({ id }: { id: string }) {
  const [deleting, isDeleting] = useState(false);
  const deleteHandler = async () => {
    try {
      if (!deleting) {
        isDeleting(true);
        const res = await deleteSponsorType(id);

        // console.log(res);
        isDeleting(false);
        if (res?.success) {
          toast.success("Deleted successfully!");
        }
        // else {
        //   toast.error("Failed to delete!");
        // }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Button
      isIconOnly
      aria-label="delete"
      color="danger"
      isLoading={deleting}
      size="sm"
      onPress={deleteHandler}
    >
      <TrashIcon className="h-5 w-5" />
    </Button>
  );
}
