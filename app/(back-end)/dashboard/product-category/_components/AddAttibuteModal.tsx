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
import { CirclePlus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { cn } from "@/utils/cn";
import SubmitButton from "@/components/SubmitButton";
import { createAttributeAction } from "@/app/actions/attribute-action";

const AddAttributeModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialState = {
    success: false,
    message: "",
    isError: false,
    data: {},
    error: {},
  };

  const [state, formAction] = useFormState(createAttributeAction, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onClose();
    }
    if (state?.isError) {
      toast.error(state?.message || "Something went wrong!");
      console.log(state);
    }
  }, [state, state?.success, state?.message]);

  return (
    <div>
      <Button
        aria-label="add attribute"
        color="warning"
        size="sm"
        startContent={<Plus />}
        title="add attribute"
        onPress={onOpen}
      >
        Add Attributes
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className={cn("section-title", " text-xl")}>
                  Add New Attribute
                </span>
              </ModalHeader>
              <ModalBody>
                <form action={formAction}>
                  <Input
                    className="w-full my-2 text-left"
                    description={state?.error?.fields?.attribute}
                    isRequired={true}
                    label="Attribute Name"
                    name="attribute"
                    placeholder="Enter attribute name..."
                    size="sm"
                    type="text"
                    validationBehavior="native"
                  />
                  <ModalFooter>
                    <SubmitButton
                      color="warning"
                      label="Add attribute"
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

export default AddAttributeModal;
