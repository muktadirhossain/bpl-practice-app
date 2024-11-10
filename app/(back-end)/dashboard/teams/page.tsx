"use client";
import React from "react";

import Slider from "@/components/molicules/slider";

// Dummy components for testing
const YourComponent1 = () => (
  <div
    style={{
      backgroundColor: "lightblue",
      padding: "20px",
      borderRadius: "8px",
    }}
  >
    Component 1
  </div>
);

const YourComponent2 = () => (
  <div
    style={{
      backgroundColor: "lightgreen",
      padding: "20px",
      borderRadius: "8px",
    }}
  >
    Component 2
  </div>
);

const YourComponent3 = () => (
  <div
    style={{
      backgroundColor: "lightcoral",
      padding: "20px",
      borderRadius: "8px",
    }}
  >
    Component 3
  </div>
);

const SlideComponent = ({ data }: { data: any }) => (
  <div
    style={{
      backgroundColor: "lightgray",
      padding: "20px",
      borderRadius: "8px",
    }}
  >
    Slide Data: {data}
  </div>
);

const page = () => {
  return (
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
      <YourComponent1 />
      <YourComponent2 />
      <YourComponent3 />
      <YourComponent3 />
      <YourComponent3 />
    </Slider>
  );
};

export default page;
