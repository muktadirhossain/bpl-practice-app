import Link from "next/link";

import FixtureCard from "./FixtureCard";

export default function UpcomingMatch() {
  return (
    <section className="container mx-auto px-5">
      <h6 className="section-subtitle">Fixtures</h6>
      <h3 className="section-title leading-extra-loose">Upcoming Matches.</h3>

      {/* Match Card Area */}
      <div className="flex justify-between items-center mt-16 mb-5">
        <h4 className="text-xl text-durbarDeep font-normal">BPL 2024</h4>
        <Link
          className="inline-block text-xs text-durbarDeep dark:text-durbarLight px-2 py-1 rounded-sm bg-durbarDeep/40 hover:bg-durbarDeep/50 transition duration-300 ease-in-out shadow-md"
          href={"#"}
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-5 ">
        {/* Match Card */}
        <FixtureCard />
        <FixtureCard />
        <FixtureCard />
      </div>
    </section>
  );
}
