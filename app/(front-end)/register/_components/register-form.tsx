"use client";
import { Input } from "@nextui-org/input";
import { cn } from "@nextui-org/theme";
import React, { useState } from "react";
import { useFormState } from "react-dom";

import { createUserAction } from "@/app/actions";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  UserIcon,
} from "@/components/icons";
import { title } from "@/components/primitives";
import SubmitButton from "@/components/SubmitButton";

const RegisterForm = () => {
  const [state, formAction] = useFormState(createUserAction, null);
  // Visibility ::
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [passVisible, setPassVisible] = useState(false);
  const togglePass = () => setPassVisible(!isVisible);

  // Reset individual field errors when the user interacts with the field
  const clearFieldError = (fieldName: string) => {
    if (state?.error?.fields?.[fieldName]) {
      state.error.fields[fieldName] = ""; // Clear the error for the specific field
    }
  };

  return (
    <form action={formAction} className="w-full flex flex-col justify-center">
      <h3
        className={title({
          color: "blue",
          size: "sm",
          fullWidth: true,
          className: "my-5",
        })}
      >
        Create An Account
      </h3>
      {state?.message && (
        <p
          className={cn("bg-rose-500/15 rounded-lg p-4 mb-3 text-rose-500", {
            "bg-green-400/20 text-emerald-500": state?.success,
          })}
        >
          {state?.message}
        </p>
      )}
      <Input
        className="w-full my-2 text-left"
        errorMessage={state?.error?.fields?.fullName}
        isInvalid={state?.error?.fields?.fullName ? true : false}
        isRequired={true}
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name..."
        type="text"
        variant="flat"
      />

      <Input
        className="w-full my-2 text-left"
        errorMessage={state?.error?.fields?.email}
        isInvalid={state?.error?.fields?.email ? true : false}
        isRequired={true}
        label="Email"
        name="email"
        placeholder="Enter your email address"
        type="email"
        variant="flat"
        onChange={() => clearFieldError("email")}
      />
      <Input
        className="my-2 text-left"
        endContent={
          <button
            aria-label="toggle password visibility"
            className="focus:outline-none"
            type="button"
            onClick={togglePass}
          >
            {passVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        errorMessage={state?.error?.fields?.password}
        isInvalid={state?.error?.fields?.password ? true : false}
        isRequired={true}
        label="Choose Password"
        minLength={6}
        name="password"
        placeholder="Enter your password"
        type={passVisible ? "text" : "password"}
        variant="flat"
      />
      <Input
        className="my-2 text-left"
        endContent={
          <button
            aria-label="toggle password visibility"
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        errorMessage={state?.error?.fields?.confirmPassword}
        isInvalid={state?.error?.fields?.confirmPassword ? true : false}
        isRequired={true}
        label="Confirm Password"
        minLength={6}
        name="confirmPassword"
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        variant="flat"
      />

      <SubmitButton
        className="my-4"
        color="warning"
        endContent={<UserIcon />}
        label="Register"
        variant="shadow"
      />
    </form>
  );
};

export default RegisterForm;
