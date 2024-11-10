"use client";
import { CirclePlus, PlusIcon } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { createCategoryAction } from "@/app/actions/category-actions";
import SubmitButton from "@/components/SubmitButton";

const initialState = {
  success: false,
  message: "",
  isError: false,
  data: {},
  error: {},
};

export default function AddCategoryModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [state, formAction] = useFormState(createCategoryAction, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onClose();
    }
    if (state?.isError) {
      toast.error(state?.message || "Something went wrong!");
    }
  }, [state, state?.success, state?.message]);

  return (
    <>
      <Button
        color="warning"
        startContent={<PlusIcon className="h-5 w-5" />}
        onPress={onOpen}
      >
        Add News Category
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Category
              </ModalHeader>
              <ModalBody>
                <form action={formAction}>
                  <Input
                    className="w-full my-2 text-left"
                    isRequired={true}
                    label="Category Name"
                    name="category"
                    placeholder="Enter category name..."
                    type="text"
                    validationBehavior="native"
                    variant="flat"
                  />
                  <ModalFooter>
                    <SubmitButton
                      color="warning"
                      label="Add Category"
                      startContent={<CirclePlus className="h-4 w-4" />}
                    />
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
