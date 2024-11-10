"use client";
import { Card, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { cn } from "@nextui-org/theme";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CalendarDays, PlayCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

interface VideoCardProps {
  video: {
    id: string;
    embedLink: string;
    thumbnail: string;
    title: string;
    channelTitle: string;
    publishedAt: string;
  };
  imageStyles?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, imageStyles }) => {
  const router = useRouter();

  return (
    <Card
      isFooterBlurred
      className="border-none object-fill cursor-pointer w-full min-h-96"
      isPressable={true}
      radius="lg"
      onClick={() => router.push(`/videos/${video.id}`)}
    >
      <div className="h-full w-full relative overflow-hidden">
        <Image
          alt={video.title}
          className={cn(
            "w-full h-[300px] object-fill transition-transform duration-500 ease-in-out",
            "hover:scale-105",
            imageStyles,
          )}
          height={600}
          src={video.thumbnail}
          width={600}
        />
        <div className="animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 w-24 bg-amber-500/20 rounded-full flex justify-center items-center backdrop-blur-sm">
          <div className="h-20 w-20 flex justify-center items-center bg-amber-400/10 rounded-full">
            <PlayCircleIcon className="text-amber-500 h-10 w-10" />
          </div>
        </div>
      </div>
      <CardFooter>
        <div className="flex flex-col w-full ">
          <h3 className="text-sm font-medium text-left text-amber-500">
            {video.title}
          </h3>
          <Divider className="my-2" />
          <p className="text-sm font-medium text-amber-500 text-left">
            {video.channelTitle}
          </p>
          <div className="date flex gap-2 items-center">
            <CalendarDays className="h-5 w-5 " />
            <span> {dayjs(video.publishedAt).fromNow()}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
