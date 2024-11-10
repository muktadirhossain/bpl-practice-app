"use client";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Modal,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { toast } from "react-hot-toast";
// Assuming this is a custom form hook

import SubmitButton from "@/components/SubmitButton";
import { updateCategoryAction } from "@/app/actions/category-actions";
import { EditIcon } from "@/components/icons";

export default function UpdateSponsorType({ id, category }: any) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Binding id to the server action
  const updateTypeWithId = updateCategoryAction.bind(null, id);

  const formAction = async (formData: FormData) => {
    const res = await updateTypeWithId(formData);

    if (res.success) {
      toast.success(res.message);
      onClose();
    } else {
      toast.error(res.message || "Failed to update category name!");
    }
  };

  return (
    <>
      <button onClick={onOpen}>
        <EditIcon className="h-5 w-5" />
      </button>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Sponsor Type
              </ModalHeader>
              <ModalBody>
                <form
                  action={formAction}
                  className="flex flex-col justify-center items-center gap-3 my-3"
                >
                  {/* Input field for sponsor type */}
                  <Input
                    isRequired
                    className="max-w-xs"
                    defaultValue={category}
                    label="Sponsor Type"
                    name="category"
                    placeholder="Enter Sponsorship Type..."
                    type="text"
                  />
                  {/* Submit button */}
                  <SubmitButton color="warning" label="Update" />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
