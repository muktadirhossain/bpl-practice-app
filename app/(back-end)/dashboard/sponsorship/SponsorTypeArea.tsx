import { Divider } from "@nextui-org/divider";

import SponsorTypeItem from "./_components/SponsorTypeItem";
import SponsorTypeFrom from "./_components/SponsorTypeFrom";

import { getSponsorsTypes } from "@/lib/fetch-sponsorship";

const SponsorTypeArea = async () => {
  const sponsorTypes = await getSponsorsTypes();

  return (
    <>
      <section className="flex-none min-w-[300px]  px-2.5">
        <SponsorTypeFrom />
        <Divider className="my-3" />
        <div>
          <ul className="my-2">
            {sponsorTypes?.map((sponsorType: any) => (
              <SponsorTypeItem
                key={sponsorType._id}
                sponsorType={sponsorType}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default SponsorTypeArea;
