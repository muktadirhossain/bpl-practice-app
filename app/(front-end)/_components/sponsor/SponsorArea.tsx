"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Marquee from "react-fast-marquee";

// const sponsorsList = [
//   {
//     id: 1,
//     sectionTitle: "Principal Partners",
//     sponsors: [
//       {
//         id: 1,
//         name: "Dream 11",
//         img_url: "/images/sponsors/veedol.webp",
//       },
//       {
//         id: 2,
//         name: "BKT Industrial",
//         img_url: "/images/sponsors/acko.webp",
//       },
//       {
//         id: 3,
//         name: "BKT Industrial",
//         img_url: "/images/sponsors/joy.webp",
//       },
//     ],
//   },
//   {
//     id: 2,
//     sectionTitle: "Associate Sponsors",
//     sponsors: [
//       {
//         id: 5,
//         name: "Dream 11",
//         img_url: "/images/sponsors/philips.webp",
//       },
//       {
//         id: 6,
//         name: "BKT Industrial",
//         img_url: "/images/sponsors/jio-white.webp",
//       },
//     ],
//   },
//   {
//     id: 3,
//     sectionTitle: "Associate Sponsors",
//     sponsors: [
//       {
//         id: 14,
//         name: "Dream 11",
//         img_url: "/images/sponsors/thums-up.webp",
//       },
//       {
//         id: 13,
//         name: "BKT Industrial",
//         img_url: "/images/sponsors/royal-green.webp",
//       },
//     ],
//   },
// ];

const SponsorArea = ({ data }: any) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const sponsorsList = JSON.parse(data);

  return (
    <div className=" h-full w-full bg-transparent mt-20">
      <section className="relative">
        {sponsorsList.map((section: any, idx: any) => (
          <div key={section?._id}>
            <h3 className="section-title">{section?.sectionTitle}</h3>

            <Marquee
              className="mt-3 mb-5"
              direction={(idx + 1) % 2 === 0 ? "right" : "left"}
              gradient={true}
              gradientColor={isDarkTheme ? "black" : "white"}
              speed={100}
            >
              {section?.sponsors?.map((sponsor: any) => (
                <div
                  key={sponsor?.id}
                  className="h-[100px] w-[250px] bg-default-100/50 flex justify-center items-center cursor-pointer rounded-md mx-10 my-5"
                >
                  <Image
                    alt={sponsor?.name}
                    className="object-contain mx-10 h-[90px] w-[200px]"
                    height={90}
                    src={sponsor?.img_url}
                    width={200}
                  />
                </div>
              ))}
            </Marquee>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SponsorArea;
