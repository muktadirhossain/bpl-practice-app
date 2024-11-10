import BannerArea from "./_components/banner/BannerArea";
import Footer from "./_components/footer/Footer";
import NewsSection from "./_components/news/news-section";
import PlayersSection from "./_components/players/PlayersSection";
import ScoreTableArea from "./_components/score-table/ScoreTableArea";
import SponsorArea from "./_components/sponsor/SponsorArea";
import UpcomingMatch from "./_components/upcoming-match/upcoming-match-section";

import { getAllSponsors } from "@/lib/fetch-sponsorship";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const allSponsors = await getAllSponsors();
  const newsSection = NewsSection();

  return (
    <div>
      <UpcomingMatch />
      <BannerArea />
      <PlayersSection />
      <ScoreTableArea />
      {newsSection}
      <SponsorArea data={JSON.stringify(allSponsors)} />
      <Footer />
    </div>
  );
}
