import Image from "next/image";
import React from "react";

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="section-title text-3xl my-4">Access Denied</h1>
      <Image
        alt="Access-denied"
        className=""
        height={350}
        src={"/assets/access-denied.svg"}
        width={350}
      />
    </div>
  );
};

export default AccessDenied;
