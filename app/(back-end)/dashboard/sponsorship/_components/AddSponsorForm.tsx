"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { addSponsor } from "@/app/actions/sponsorship-actions";
import SubmitButton from "@/components/SubmitButton";
import ImagePicker from "@/components/ImagePicker";

const initialState = {
  success: false,
  message: "",
  isError: false,
  data: {},
  error: {},
};

export default function AddSponsorForm({
  sponsorTypes,
}: {
  sponsorTypes: any;
}) {
  const data = JSON.parse(sponsorTypes);
  const [state, formAction] = useFormState(addSponsor, initialState);

  useEffect(() => {
    // console.log(state, "state");
    if (state?.success) {
      toast.success(state.message);
    }
    if (state?.isError) {
      toast.error(state?.message || "Something went wrong!");
    }
  }, [state?.message, state?.success]);

  return (
    <Card className="max-w-md mx-auto mb-10">
      <CardBody>
        <h3 className="capitalize w-full font-semibold from-[#F58B1E] to-[#F1D848] text-xl lg:text-2xl bg-clip-text text-center block text-transparent bg-gradient-to-b my-3">
          Add Sponsor
        </h3>

        <form action={formAction}>
          <Select
            className="my-2"
            isRequired={true}
            label="Sponsor Type"
            name="sponsor_type"
            placeholder="Select Sponsor Type"
          >
            {data.map((item: any) => (
              <SelectItem key={item?._id} value={item?._id}>
                {item?.sponsorship_type}
              </SelectItem>
            ))}
          </Select>
          <Input
            className="mb-3 mt-2"
            isRequired={true}
            label="Sponsor Name"
            name="sponsorship_name"
            placeholder="Enter Sponsorship Name..."
            type="text"
            validationBehavior="native"
          />
          <ImagePicker fieldName="sponsor_img" imageSize="(200px* 90px)" />

          <div className="flex justify-center items-center mt-5 mb-2">
            <SubmitButton color="warning" label="Add Sponsors" />
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
