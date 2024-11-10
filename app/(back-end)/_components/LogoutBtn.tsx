"use client";
import { signOut } from "next-auth/react";
import { Button } from "@nextui-org/button";

import { LogoutIcon } from "@/components/icons";

const LogoutBtn = () => {
  return (
    <Button
      isIconOnly
      aria-label="logout"
      color="danger"
      type="submit"
      onClick={() => signOut()}
    >
      <LogoutIcon height={16} width={16} />
    </Button>
  );
};

export default LogoutBtn;
