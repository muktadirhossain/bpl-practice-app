import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";

const PlayersSection = () => {
  return (
    <div>
      <h6 className="section-subtitle">Players</h6>
      <h2 className="section-title">Meet Out Team</h2>
      <section>
        <div className=" min-h-screen p-4 md:p-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Card */}
            <div className="w-full rounded-3xl overflow-hidden">
              <div className="relative flex items-end bg-one">
                <div className="absolute flex justify-center items-center top-0 left-0 bg-durbarDeep/35 h-[20%] w-[80%] rounded-t-xl">
                  <h3 className="block w-full text-right pr-4 text-3xl font-semibold">
                    Best Bats man 🏏
                  </h3>
                </div>
                <div className="w-1/3 after-gradient">
                  <Image
                    src="/images/players/63961.webp"
                    alt="Sunil Narine"
                    width={200}
                    height={250}
                    className="object-cover player-bottom-blur"
                  />
                </div>
                <div className="flex-1 pl-4 pb-4 bg-gradient-to-r ">
                  <h3 className=" text-2xl font-bold">SUNIL</h3>
                  <h4 className=" text-3xl font-bold mb-2">NARINE</h4>
                  <span className="bg-[#8B6CC1]  px-4 py-1 rounded-full text-sm">
                    BATTER
                  </span>
                </div>
              </div>
              <div className="bg-[#3D1F84] p-4 grid grid-cols-10">
                <div className="text-center after-right-border col-span-3">
                  <div className="text-[#FFD700] text-3xl font-bold">15</div>
                  <div className=" text-sm">MATCHES</div>
                </div>
                <div className="text-center after-right-border col-span-3">
                  <div className="text-[#FFD700] text-3xl font-bold">488</div>
                  <div className=" text-sm">RUNS</div>
                </div>
                <div className="text-center after-right-border col-span-3">
                  <div className="text-[#FFD700] text-3xl font-bold">
                    180.74
                  </div>
                  <div className=" text-sm">STRIKE RATE</div>
                </div>
                <div className="flex justify-end items-center">
                  <ChevronRight className=" h-6 w-6" />
                </div>
              </div>
            </div>
            {/*  Card 02 */}
            <div className="w-full rounded-3xl overflow-hidden">
              <div className="relative flex items-end bg-one">
                <div className="absolute flex justify-center items-center top-0 left-0 bg-durbarDeep/35 h-[20%] w-[80%] rounded-t-xl">
                  <h3 className="block w-full text-right pr-4 text-3xl font-semibold">
                    Best Bats man 🏏
                  </h3>
                </div>
                <div className="w-1/3 after-gradient">
                  <Image
                    src="/images/players/63961.webp"
                    alt="Sunil Narine"
                    width={200}
                    height={250}
                    className="object-cover player-bottom-blur"
                  />
                </div>
                <div className="flex-1 pl-4 pb-4 bg-gradient-to-r ">
                  <h3 className=" text-2xl font-bold">SUNIL</h3>
                  <h4 className=" text-3xl font-bold mb-2">NARINE</h4>
                  <span className="bg-gradient-to-t from-durbarDeep to-durbarLight px-4 py-1 rounded-full text-sm">
                    BATTER
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-t from-durbarDeep to-durbarLight  p-4 grid grid-cols-10">
                <div className="text-center after-right-border col-span-3">
                  <div className="text-black text-3xl font-bold">15</div>
                  <div className="text-black text-sm">MATCHES</div>
                </div>
                <div className="text-center after-right-border col-span-3">
                  <div className="text-black text-3xl font-bold">488</div>
                  <div className="text-sm text-black">RUNS</div>
                </div>
                <div className="text-center after-right-border col-span-3">
                  <div className="text-black text-3xl font-bold">
                   20
                  </div>
                  <div className="text-black text-sm">STRIKE RATE</div>
                </div>
                <div className="flex justify-end items-center">
                  <ChevronRight className=" h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayersSection;
