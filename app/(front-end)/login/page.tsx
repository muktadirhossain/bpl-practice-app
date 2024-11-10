import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";

import SocialLogin from "./_component/SocialLogin";
import LoginForm from "./_component/LoginForm";

const page = () => {
  return (
    <div>
      <Card
        isFooterBlurred
        className="w-96 mx-auto px-5 flex flex-col items-center"
      >
        <CardBody>
          <LoginForm />
        </CardBody>
        <div className="flex justify-center items-center gap-4 py-5 mx-4">
          <Divider className="w-full" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="w-full" />
        </div>
        <p>
          Don`t have an acount ?{" "}
          <Link
            className="text-primary-600 underline cursor-pointer"
            href={"/register"}
          >
            Sign Up.
          </Link>
        </p>
        <SocialLogin />
      </Card>
    </div>
  );
};

export default page;
