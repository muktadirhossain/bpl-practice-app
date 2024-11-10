import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { CalendarDays, Clock9, MapPinned } from "lucide-react";
import Image from "next/image";

const FixtureCard = () => {
  return (
    <Card className="w-full">
      <div className="flex justify-around items-center z-10">
        <div className="w-2/3 flex flex-col justify-between items-center">
          <div className="flex justify-evenly items-center gap-x-5 px-5 pt-4">
            <div className="pt-2.5">
              <Image
                alt="Durbar Rajshahi"
                className="h-16 w-16 "
                height={100}
                src={"/images/teams/fortune-barishal.png"}
                width={100}
              />
              <p className="gradient-text font-semibold text-medium my-2 capitalize leading-none">
                Durbar Rajshahi
              </p>
            </div>
            <p className="text-base font-bold bg-durbarDeep/15 text-durbarDeep px-2 py-2 rounded-md">
              VS
            </p>
            <div className="pt-2.5">
              <Image
                alt="Durbar Rajshahi"
                className="h-16 w-16 "
                height={100}
                src={"/images/teams/khulna-tigers.png"}
                width={100}
              />
              <p className="gradient-text text-medium  font-semibold my-2 capitalize leading-none">
                Khulna Tigers
              </p>
            </div>
          </div>

          <div className="py-1.5 w-full mx-auto">
            <Divider />
            <div className="flex items-center justify-center gap-x-2 my-2.5">
              <MapPinned className="h-5 w-5 text-durbarDeep" />
              <p className="text-durbarDeep text-xs">Mirpur Cricket Ground!</p>
            </div>
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="w-1/3 flex justify-center items-center px-3">
          <div className="text-center">
            <p className="text-center text-durbarDeep font-semibold bg-durbarDeep/15 p-1.5 rounded-md">
              T-20 Match
            </p>
            <p className="flex justify-start items-center gap-x-2 my-2 mx-auto">
              <span>
                <Clock9 className="h-3 w-3 text-durbarDeep" />
              </span>
              <span className="gradient-text text-xs">01:30 PM</span>
            </p>
            <p className="flex justify-start items-center gap-x-2 my-2 mx-auto">
              <span>
                <CalendarDays className="h-3 w-3 text-durbarDeep" />
              </span>
              <span className="gradient-text text-xs">20 Oct,2024</span>
            </p>
          </div>
        </div>
      </div>
      {/* blur effects */}
      <div className="h-16 w-16 bg-gradient-to-b from-durbarDeep/50 to-durbarLight/50 rounded-full absolute -top-1 -left-1 blur-[60px]" />
      <div className="h-36 w-36 bg-gradient-to-b from-durbarDeep/50 to-durbarLight/50 rounded-full absolute -bottom-1 -right-1 blur-[80px]" />
    </Card>
  );
};

export default FixtureCard;
