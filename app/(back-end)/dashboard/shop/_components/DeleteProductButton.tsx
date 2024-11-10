"use client";
import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { toast } from "react-hot-toast";

import { deleteProductAction } from "@/app/actions/product-actions";
import { DeleteIcon } from "@/components/icons";

const DeleteProductButton = ({ productId }: { productId: string }) => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handelDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteProductAction(productId);

      if (res?.success) {
        toast.success("Delete Product successfully!");
        onClose();
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
        <Tooltip color="danger" content="Delete user">
          <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <DeleteIcon />
          </span>
        </Tooltip>
      </button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
              <ModalBody>
                <p>Area you sure want to delete this Product ?</p>
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

export default DeleteProductButton;
