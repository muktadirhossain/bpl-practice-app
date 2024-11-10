import { cn } from "@nextui-org/theme";

import VideoCard from "./_components/VideoCard";

import { dashboardHeading } from "@/components/primitives";
import { fetchYouTubeVideos } from "@/lib/fetch-youtube";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { videos, pageInfo } = await fetchYouTubeVideos();
  // Get the first two items
  const firstTwoVideos = videos.slice(0, 2);
  // Get all other items except the first two
  const otherVideos = videos.slice(2);

  return (
    <div>
      <h1 className={dashboardHeading()}>VIDEOS & HIGHLIGHTS</h1>
      <p className="text-center py-5 text-sm mx-auto max-w-5xl">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
        quos ex ipsam neque sed qui molestiae aliquid rerum vero excepturi
        facere soluta atque, in, possimus, suscipit impedit voluptatem
        repellendus repellat?
      </p>
      <div>
        {/* 2st two */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mb-5">
          {firstTwoVideos.map((video) => (
            <div key={video.id}>
              <VideoCard
                imageStyles={cn("object-cover h-[400px]")}
                video={video}
              />
            </div>
          ))}
        </section>
        {/* Remaining Videos */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherVideos.map((video) => (
            <div key={video.id}>
              <VideoCard video={video} />
            </div>
          ))}
        </section>
        <p>Total videos: {pageInfo.totalResults}</p>
      </div>
    </div>
  );
}
