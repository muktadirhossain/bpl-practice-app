import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";

import UploadImageButton from "./UploadImageButton";

export interface UserProfileCardProps {
  user: {
    image: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    bio?: string;
    phone?: string;
    password?: string;
  };
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <Card className="">
      <CardBody>
        <div className="flex justify-between items-center flex-col">
          <Image
            alt={user?.name || "user profile image"}
            className="mb-4 block rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
            height={200}
            src={user?.image || "/assets/avatar.svg"}
            width={200}
          />
          <div className="mt-5">
            <h3 className="mb-1 text-xl text-center gradient-text font-bold text-gray-900 dark:text-white capitalize">
              {user?.name}
            </h3>
            <div className="mb-1 text-sm text-gray-500 dark:text-white lowercase">
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </div>
            <div className="mb-4 text-sm text-gray-500 dark:text-white">
              <a href={`tel:+${user?.phoneNumber}`}>{user?.phoneNumber}</a>
            </div>
            <div className="flex items-center space-x-4 dark:text-white">
              {/* <Button color="danger">
                Delete
              </Button> */}
              <UploadImageButton />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserProfileCard;
