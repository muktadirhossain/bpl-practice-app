"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import { deleteCategoryAction } from "@/app/actions/category-actions";
import { DeleteIcon } from "@/components/icons";

const DeleteCategoryButton = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handelDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteCategoryAction(id);

      if (res?.success) {
        toast.success("Delete category successfully!");
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={onOpen}>
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          {loading ? <Loader /> : <DeleteIcon />}
        </span>
      </button>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
              <ModalBody>
                <p>Area you sure want to delete this category ?</p>
                <p>
                  If you delete this category the associated news will be
                  deleted
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isLoading={loading}
                  variant="shadow"
                  onPress={handelDelete}
                >
                  Delete
                </Button>
                <Button color="default" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteCategoryButton;
