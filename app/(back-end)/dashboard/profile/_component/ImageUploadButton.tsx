"use client";
import { Spinner } from "@nextui-org/spinner";
import { CloudUpload } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function ImageUploadButton() {
  const formStatus = useFormStatus as unknown as () => { pending: boolean };
  const { pending }: { pending: boolean } = formStatus();

  return (
    <span className="gap-x-3 items-center flex justify-between cursor-pointer px-4 py-2 rounded-lg primary-btn">
      {pending ? (
        <Spinner color="default" size="sm" />
      ) : (
        <CloudUpload className="h-5 w-5" />
      )}
      <span className="text-xs md:text-base text-center">Upload Picture</span>
    </span>
  );
}
