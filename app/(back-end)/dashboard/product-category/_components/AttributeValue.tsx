"use client";
import { deleteAttributeValueAction } from "@/app/actions/attribute-action";
import SubmitButton from "@/components/SubmitButton";
import { DeleteIcon } from "@/components/icons";
import { Chip } from "@nextui-org/chip";
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
import { toast } from "react-hot-toast";

const AttributeValue = ({ attributeVal }: { attributeVal: any }) => {

  const { value, _id } = attributeVal || {};
  const { isOpen, onOpen, onOpenChange , onClose} = useDisclosure();

  const handelDelete = async () => {
    event?.preventDefault()
    const res = await deleteAttributeValueAction(_id)
    if(res){
        onClose()
        toast.success("Value deleted successfully")
      } else {
        toast.error(res?.message || "Something went wrong" )
      }
    }

      // Binding id to the server action
  const deleteValueWithId = deleteAttributeValueAction.bind(null, _id);

  const formAction = async () => {
    const res = await deleteValueWithId();

    if (res.success) {
      toast.success(res.message);
      onClose();
    } else {
      toast.error(res.message || "Failed to update category name!");
    }
  };
  

  return (
    <>
      <Chip className="capitalize text-xs" onClose={onOpen}>
        {value}
      </Chip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-warning">Warning</ModalHeader>
              <ModalBody>
                <p>Please be careful while <span className="text-warning">updating</span> or <span className="text-rose-500">deleting</span> the values.</p>
                <form action="#">
                  <Input
                    type="text"
                    placeholder="Enter new value"
                    defaultValue={value}
                    className="mb-2"
                  />
                  <SubmitButton label="Update Value" color="warning" />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  cancel
                </Button>
                <form action={formAction}>
                    <SubmitButton color="danger" label="Delete Value" endContent={<DeleteIcon/>}/>
                </form>
                {/* <Button color="danger" onPress={handelDelete}>
                  Delete Value
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AttributeValue;
