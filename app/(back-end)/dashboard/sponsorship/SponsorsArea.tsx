import AddSponsorForm from "./_components/AddSponsorForm";
import SponsorsList from "./_components/SponsorsList";

import { getAllSponsors, getSponsorsTypes } from "@/lib/fetch-sponsorship";

export default async function SponsorsArea() {
  const sponsorTypes = await getSponsorsTypes();
  const allSponsors = await getAllSponsors();

  //   console.log(JSON.stringify(allSponsors))
  return (
    <section className="flex-grow">
      {/* <h2 className="section-title leading-extra-loose">Sponsorship</h2> */}
      <div>
        <AddSponsorForm sponsorTypes={JSON.stringify(sponsorTypes)} />
      </div>
      <SponsorsList data={JSON.stringify(allSponsors)} />
    </section>
  );
}
