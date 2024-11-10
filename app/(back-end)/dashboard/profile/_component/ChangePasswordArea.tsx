"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { KeyRound } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import SubmitButton from "@/components/SubmitButton";
import { changePassword } from "@/app/actions/user-actions";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

const ChangePasswordArea = ({ user }: { user: string }) => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const parsedUser = JSON.parse((user as string) || "");
  const hasPassword = parsedUser?.password;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <h3 className="gradient-text text-xl font-semibold">Change Password</h3>
      </CardHeader>
      <CardBody>
        <form
          ref={formRef}
          action={async (formData) => {
            const res = await changePassword(formData);

            if (res?.success) {
              toast.success(res?.message);
              formRef.current?.reset();

              return;
            }
            toast.error(res?.message);
            formRef.current?.reset();
          }}
        >
          {hasPassword && (
            <Input
              className="my-1.5"
              endContent={
                <button
                  aria-label="toggle old password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                >
                  {oldPasswordVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="Old Password"
              minLength={8}
              name="old-password"
              placeholder="Old Password"
              size="lg"
              type={oldPasswordVisible ? "text" : "password"}
              validationBehavior="native"
            />
          )}
          <Input
            className="my-1.5"
            endContent={
              <button
                aria-label="toggle new password visibility"
                className="focus:outline-none"
                type="button"
                onClick={() => setNewPasswordVisible(!newPasswordVisible)}
              >
                {newPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="New Password"
            minLength={8}
            name="password"
            placeholder="New Password..."
            required={true}
            size="lg"
            type={newPasswordVisible ? "text" : "password"}
            validationBehavior="native"
          />
          <Input
            className="mt-1.5 mb-3"
            endContent={
              <button
                aria-label="toggle confirm password visibility"
                className="focus:outline-none"
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {confirmPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="Confirm Password"
            minLength={8}
            name="confirm-password"
            placeholder="Confirm Password ..."
            required={true}
            size="lg"
            type={confirmPasswordVisible ? "text" : "password"}
            validationBehavior="native"
          />
          <SubmitButton
            color="warning"
            label="Change Password"
            startContent={<KeyRound />}
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default ChangePasswordArea;
