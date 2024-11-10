import { toggleUserRole } from "@/app/actions/user-actions";
import { EyeFilledIcon } from "@/components/icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const UserModal = ({ user }: { user: any }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const changeRoleAction = async () => {
    setLoading(true);
    try {
      const res = await toggleUserRole(user?._id);
      toast.success(res?.message);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        startContent={<EyeFilledIcon />}
      ></Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-center">{user?.name}</h3>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center">
                  <Image
                    alt={user?.name}
                    className="h-[100px] w-[100px] block object-cover  rounded-full ring ring-warning-500"
                    height={100}
                    src={user?.image || "/assets/avatar.svg"}
                    width={100}
                  />

                  <span className="capitalize my-3 text-xs">{user?.bio}</span>

                  <div>
                    <p>
                      <strong>Role: </strong>
                      {user?.role}
                    </p>
                    <Divider />
                    <p>
                      <strong>Email: </strong>
                      {user?.email}
                    </p>
                    <Divider />
                    <p>
                      <strong>Address: </strong>
                      {user?.address}
                    </p>
                    <Divider />
                    <p>
                      <strong>Number: </strong>
                      {user?.phoneNumber}
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={changeRoleAction}
                  radius="sm"
                  color="warning"
                  onPress={onClose}
                  isLoading={loading}
                >
                  {user?.role !== "admin" ? "Make Admin" : "Make User"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserModal;
