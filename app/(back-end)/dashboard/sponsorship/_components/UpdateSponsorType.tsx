"use client";
import { PencilIcon } from "lucide-react";
import { Button } from "@nextui-org/button";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Modal,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";

import SubmitButton from "@/components/SubmitButton";
import { updateSponsorTypeName } from "@/app/actions/sponsorship-actions";

export default function UpdateSponsorType({ sponsorType }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const updateTypeWithId = updateSponsorTypeName.bind(null, sponsorType?._id);

  return (
    <>
      <Button
        color="warning"
        isIconOnly={true}
        size="sm"
        variant="shadow"
        onPress={onOpen}
      >
        <PencilIcon className="h-5 w-5 " />
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Sponsor Type
              </ModalHeader>
              <ModalBody>
                <form
                  action={(formData) => {
                    updateTypeWithId(formData);
                    onClose();
                  }}
                  className="flex flex-col justify-center items-center gap-3 my-3"
                >
                  <Input
                    isRequired
                    className="max-w-xs"
                    defaultValue={sponsorType.sectionTitle}
                    label="Sponsor Type"
                    name="sponsorship_type"
                    placeholder="Enter Sponsorship Type..."
                    type="text"
                  />
                  <Input
                    isRequired
                    className="max-w-xs"
                    defaultValue={sponsorType.serial_number}
                    label="Sponsor Serial"
                    name="serial_number"
                    placeholder="Enter Sponsorship Serial..."
                    type="number"
                  />
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
