import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import React from "react";

const BannerArea: React.FC = () => {
  return (
    <section className="container mx-auto min-h-[80vh] mt-20">
      <div className="relative py-20 px-4 bg-team-banner bg-cover bg-no-repeat bg-center flex justify-start items-center rounded-md">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-md h-full w-full" />
        {/* Content */}
        <div className="z-10 pl-10">
          <h2 className={cn("section-title text-left", "text-durbarDeep")}>
            Get ready for the game <br />
            of your life!
          </h2>
          <p
            className={cn(
              "section-subtitle text-lg font-normal text-left my-5 leading-none sm:leading-tight",
            )}
          >
            This championship is going to be broadcast on national TV!
            <br />
            Stay tuned to watch the unforgettable battle of the champions.
          </p>
          <Button
            className="primary-btn shadow-lg shadow-durbarDeep/25"
            color="warning"
          >
            More Information
          </Button>
        </div>
        {/* bottom text */}
        <h2 className="absolute text-right bottom-1 right-2 bg-gradient-to-t from-durbarDeep/0 via-durbarDeep/15 to-durbarDeep/35 leading-none bg-clip-text text-transparent text-4xl sm:text-4xl md:5xl lg:text-7xl font-black uppercase drop-shadow-2xl shadow-durbarDeep/30">
          Durbar Rajshahi
        </h2>
      </div>
    </section>
  );
};

export default BannerArea;

{
  /* <div className="text-center">
  <h2 className="text-4xl font-bold">
    <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-900">
      championship
    </span>
  </h2>
</div> */
}
