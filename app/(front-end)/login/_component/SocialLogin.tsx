"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";

import { doSocialLogin } from "@/app/actions";

const SocialLogin = () => {
  return (
    <form action={doSocialLogin}>
      <Button
        className="my-3 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center"
        name="action"
        type="submit"
        value="google"
      >
        <Image alt="google" height={30} src="/assets/google.png" width={30} />
        <span>Continue with Google</span>
      </Button>
    </form>
  );
};

export default SocialLogin;
