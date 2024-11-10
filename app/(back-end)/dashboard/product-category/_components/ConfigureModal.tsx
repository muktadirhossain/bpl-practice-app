"use client";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Modal,
} from "@nextui-org/modal";
import { toast } from "react-hot-toast";
import { CogIcon } from "lucide-react";
import { addValuesToAttributesAction } from "@/app/actions/attribute-action";
import { Input } from "@nextui-org/input";
import SubmitButton from "@/components/SubmitButton";
import { Chip } from "@nextui-org/chip";

export default function ConfigureModal({ id, attribute }: any) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Binding id to the server action
  const updateTypeWithId = addValuesToAttributesAction.bind(null, id);

  const formAction = async (formData: FormData) => {
    const res = await updateTypeWithId(formData);
    console.log(res);
    if (res.success) {
      toast.success(res.message);
      onClose();
    } else {
      toast.error(res.message || "Failed to update category name!");
    }
  };

  //   const onSubmit = async () => {
  //     const res = await
  //   };

  return (
    <>
      <button onClick={onOpen}>
        <CogIcon className="h-5 w-5 text-durbarDeep" />
      </button>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize">
                <h4>
                  Configure <span className="text-durbarDeep">{attribute}</span> Attribute
                </h4>
              </ModalHeader>
              <ModalBody>
                <form action={formAction}>
                  <Input
                    type="Text"
                    label="Add Value"
                    name="value"
                    placeholder={`Enter ${attribute} Name`}
                    className="mb-2"
                    size="sm"
                  />
                  <SubmitButton color="warning" label="Configure" />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
