import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";

import SocialLogin from "../login/_component/SocialLogin";

import RegisterForm from "./_components/register-form";

const page = () => {
  return (
    <div>
      <Card
        isFooterBlurred
        className="min-w-[450px] px-5 flex flex-col items-center"
      >
        <RegisterForm />
        <Divider className="my-4" />

        <p>Sign up with Google</p>
        <SocialLogin />
        <p className="my-3">
          Already have an account?{" "}
          <Link
            className="text-violet-600 underline cursor-pointer"
            href={"/login"}
          >
            Login.
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default page;
