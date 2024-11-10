"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { CirclePlus, PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import { cn } from "@/utils/cn";
import SubmitButton from "@/components/SubmitButton";
import { createProductCategoryAction } from "@/app/actions/product-category-cations";

const AddCategoryModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [state, formAction] = useFormState(createProductCategoryAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onClose();
    } else {
      toast.error(state?.message || "Something went wrong!");
    }
  }, [state, state?.success, state?.message]);

  return (
    <div>
      <Button
        isIconOnly
        aria-label="add category"
        color="warning"
        startContent={<PlusCircle />}
        title="add category"
        onPress={onOpen}
      />
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className={cn("section-title", " text-xl")}>
                  Add New Product Category
                </span>
              </ModalHeader>
              <ModalBody>
                <form action={formAction}>
                  <Input
                    className="w-full my-2 text-left"
                    isRequired={true}
                    label="Category Name"
                    name="category"
                    placeholder="Enter category name..."
                    size="lg"
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
    </div>
  );
};

export default AddCategoryModal;
