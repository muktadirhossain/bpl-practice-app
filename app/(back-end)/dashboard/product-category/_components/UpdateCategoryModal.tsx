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

import SubmitButton from "@/components/SubmitButton";
import { EditIcon } from "@/components/icons";
import { updateCategoryAction } from "@/app/actions/product-category-cations";

export default function UpdateCategoryModal({ id, category }: any) {
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
                Edit Product Category
              </ModalHeader>
              <ModalBody>
                <form
                  action={formAction}
                  className="flex flex-col justify-center items-center gap-3 my-3"
                >
                  <Input
                    isRequired
                    className="max-w-xs"
                    defaultValue={category}
                    label="Product Category"
                    name="category"
                    placeholder="Enter Product Category..."
                    size="lg"
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
