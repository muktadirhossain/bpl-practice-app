"use client";

import { Card } from "@nextui-org/card";
import Image from "next/image";

import Slider from "@/components/molicules/slider";

const ImageSlider = ({ images }: { images: string }) => {
  return (
    <div>
      <Slider
        autoplay
        loop
        navigation
        pagination
        responsive={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        slidesPerView={1}
        spaceBetween={20}
      >
        {JSON.parse(images)?.map((img: string) => (
          <SliderWrapper key={img} imgLink={img} />
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;

// Dummy components for testing
const SliderWrapper = ({ imgLink }: { imgLink: string }) => (
  <Card isFooterBlurred className="border-none" radius="lg">
    <Image
      alt={imgLink}
      className="z-0 w-full h-full object-cover"
      height={200}
      src={imgLink}
      width={200}
    />
  </Card>
);

{
  /* <Image className="object-cover self-center" alt={imgLink} height={500} width={500} src={imgLink} /> */
}
