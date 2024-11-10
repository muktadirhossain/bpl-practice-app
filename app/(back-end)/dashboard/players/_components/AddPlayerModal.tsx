import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "lucide-react";

// import AddPlayerForm from "./AddPlayerForm";

export default function AddPlayerModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="warning"
        startContent={<PlusIcon className="h-5 w-5" />}
        onPress={onOpen}
      >
        Add Player
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Player
              </ModalHeader>
              <ModalBody>{/* <AddPlayerForm /> */}</ModalBody>
              <ModalFooter>
                <Button
                  color="warning"
                  startContent={<PlusIcon />}
                  onPress={onClose}
                >
                  Add
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
