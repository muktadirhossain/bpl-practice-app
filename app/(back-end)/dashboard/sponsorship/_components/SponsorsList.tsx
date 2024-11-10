import SponsorLogo from "./SponsorLogo";
import UpdateSponsorType from "./UpdateSponsorType";

export default function SponsorsList({ data }: { data: any }) {
  const list = JSON.parse(data);

  return (
    <section>
      {list?.map((sponsorType: any) => {
        return (
          <div key={sponsorType?._id} className="mt-4 mb-6">
            <div className="my-2 flex justify-start gap-x-7 items-center px-2">

            <h3 className="text-durbarDeep capitalize inline-block text-center font-semibold text-2xl ">
              {sponsorType?.sectionTitle}
            </h3>
            <UpdateSponsorType sponsorType={sponsorType}  />
           
            </div>
            <div>
              {sponsorType?.sponsors?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5">
                  {sponsorType?.sponsors?.map((sponsor: any) => (
                    <SponsorLogo
                      key={sponsor.id}
                      sponsor={...sponsor}
                
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center font-medium">No Logo found !</p>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
