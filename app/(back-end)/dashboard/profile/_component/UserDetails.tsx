"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { UserRoundPen } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";

import SubmitButton from "@/components/SubmitButton";
import { updateUserDetails } from "@/app/actions/user-actions";

const UserDetails = ({ user: userString }: { user: string }) => {
  const user = JSON.parse(userString);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Card>
      <CardHeader>
        <h3 className="gradient-text text-xl font-semibold">
          User Information
        </h3>
      </CardHeader>
      <CardBody>
        <form
          ref={formRef}
          action={async (formData) => {
            const res = await updateUserDetails(formData);

            if (res.success) {
              toast.success(res.message);
              formRef.current?.reset();

              return;
            }
            toast.error(res.message);
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              required
              className="my-1.5"
              defaultValue={user?.name}
              label="NAME"
              minLength={2}
              name="name"
              placeholder="Enter your name..."
              size="lg"
              validationBehavior="native"
            />
            <Input
              readOnly
              className="my-1.5 cursor-not-allowed"
              defaultValue={user?.email}
              label="EMAIL"
              size="lg"
              type="email"
              validationBehavior="native"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              className="my-1.5"
              defaultValue={user?.bio}
              label="BIO"
              minLength={10}
              name="bio"
              placeholder="Enter Bio..."
              required={true}
              size="lg"
              type="text"
              validationBehavior="native"
            />
            <Input
              className="my-1.5 cursor-not-allowed"
              defaultValue={user?.phoneNumber}
              label="PHONE NUMBER"
              max={11}
              minLength={11}
              name="phone"
              placeholder="Enter Phone Number..."
              required={true}
              size="lg"
              type="text"
              validationBehavior="native"
            />
          </div>
          <Textarea
            className="my-1.5"
            defaultValue={user?.address}
            label="ADDRESS"
            minLength={10}
            name="address"
            placeholder="Type your address here..."
            required={true}
            size="lg"
            validationBehavior="native"
          />
          <div className="mx-auto max-w-[200px]">
            <SubmitButton
              color="warning"
              label="Save Changes"
              startContent={<UserRoundPen />}
            />
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default UserDetails;
