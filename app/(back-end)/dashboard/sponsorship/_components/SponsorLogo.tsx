"use client";
import { TrashIcon, Loader } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { deleteSponsor } from "@/app/actions/sponsorship-actions";
import { cn } from "@/utils/cn";

export default function SponsorLogo({ sponsor }: any) {
  const [deleting, setDeleting] = useState(false);

  const deleteLogo = async (id: string) => {
    setDeleting(true);
    try {
      if (!deleting) {
        const res = await deleteSponsor(id);

        if (res?.success) {
          toast.success("Deleted successfully!");
        } else {
          toast.error("Failed to delete!");
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(true);
    }
  };

  return (
    <div className="cursor-pointer">
      <Image
        alt={sponsor?.name}
        className="rounded object-fill w-full h-[100px]
        transition-transform duration-500 ease-in-out hover:scale-105 "
        height={100}
        src={sponsor?.img_url}
        width={200}
      />
      <p className="text-center font-normal text-xs mt-1">{sponsor?.name}</p>
      <button
        className={cn(
          " block mx-auto my-2 bg-rose-500 text-white hover:bg-rose-600 rounded-lg px-2 py-1.5",
          {
            "animate-pulse": deleting,
          },
        )}
        disabled={deleting}
        onClick={() => deleteLogo(String(sponsor.id))}
      >
        {deleting ? (
          <Loader className="h-4 w-4" />
        ) : (
          <TrashIcon className=" h-4 w-4" />
        )}
      </button>
    </div>
  );
}
