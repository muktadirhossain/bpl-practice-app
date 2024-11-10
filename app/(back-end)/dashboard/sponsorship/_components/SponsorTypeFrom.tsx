import { Input } from "@nextui-org/input";
import { PlusIcon } from "lucide-react";
import { Card, CardBody } from "@nextui-org/card";

import { addSponsorTypeAction } from "@/app/actions/sponsorship-actions";
import SubmitButton from "@/components/SubmitButton";

export default function SponsorTypeFrom() {
  return (
    <Card>
      <CardBody>
        <h3 className="capitalize w-full font-semibold from-[#F58B1E] to-[#F1D848] text-xl lg:text-2xl bg-clip-text text-center block text-transparent bg-gradient-to-b">
          Sponsorship Types
        </h3>

        <form
          action={addSponsorTypeAction}
          className="flex flex-col justify-center items-center gap-3 my-3"
        >
          <Input
            isRequired
            className="max-w-xs"
            label="Sponsor Type"
            name="sponsorship_type"
            placeholder="Enter Sponsorship Type..."
            type="text"
          />
          <SubmitButton
            color="warning"
            label="Add Sponsor Type"
            startContent={<PlusIcon className="h-4 w-5 " />}
          />
        </form>
      </CardBody>
    </Card>
  );
}
