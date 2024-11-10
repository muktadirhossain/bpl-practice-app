import SponsorTypeArea from "./SponsorTypeArea";
import SponsorsArea from "./SponsorsArea";

export const dynamic = "force-dynamic";

const SponsorshipPage = async () => {
  // Await the async SponsorTypeArea
  const sponsorTypeArea = await SponsorTypeArea();
  const sponsorsArea = await SponsorsArea();

  return (
    <section className="flex flex-col-reverse sm:flex-row min-h-[80vh]">
      {sponsorsArea}
      {sponsorTypeArea}
    </section>
  );
};

export default SponsorshipPage;
