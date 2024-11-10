"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  UserIcon,
} from "@/components/icons";
import { credentialsLogin } from "@/app/actions";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await credentialsLogin(formData);

      if (response.success) {
        toast.success("Login successful!");
        router.push("/dashboard/home");
      }

      if (response.isError) {
        toast.error(response?.message);
        setError(response?.message);
      }
    } catch (error: any) {
      const customErrorMessage = error.message
        .replace(/AuthError:/, "")
        .replace(/Read more at https:\/\/errors\.authjs\.dev#autherror.*/, "") // Remove URL and anything after it
        .trim();

      setError(customErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full flex flex-col items-center" onSubmit={onSubmit}>
      <h3 className={"section-title leading-extra-loose text-4xl"}>Login</h3>
      {error && (
        <p className="bg-rose-500/20 text-rose-500 p-4 rounded-md my-2">
          {error}
        </p>
      )}

      <Input
        className="w-full my-2  text-left"
        isRequired={true}
        label="Email"
        name="email"
        placeholder="Enter your email address"
        type="email"
        validationBehavior="native"
        variant="flat"
      />
      <Input
        className="mb-2 text-left"
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
        isRequired={true}
        label="Password"
        name="password"
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        validationBehavior="native"
        variant="flat"
      />

      <Button
        color="warning"
        disabled={isLoading}
        endContent={<UserIcon />}
        isLoading={isLoading}
        // variant="shadow"
        type="submit"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
