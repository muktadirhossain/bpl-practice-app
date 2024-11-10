"use client";
import { Share2Icon } from "lucide-react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  RedditShareButton,
  PinterestShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  RedditIcon,
  PinterestIcon,
} from "next-share";
import { usePathname } from "next/navigation";

type ShareProps = {
  quote?: string;
  title?: string;
  thumbnail?: string;
};

const ShareButtons = ({ quote = "Durbar News", thumbnail }: ShareProps) => {
  const path = usePathname();
  const url = process.env.NEXT_PUBLIC_BASE_URL + path;

  return (
    <div>
      <div className="w-full flex justify-start items-center gap-x-2 mt-2 mb-5">
        <Share2Icon className="text-amber-600 font-semibold" size={24} />
        <span className=" px-1 rounded-sm">Share durbar News</span>
      </div>
      <div className="flex gap-4">
        {/* Facebook Share Button */}
        <FacebookShareButton
          blankTarget={true}
          hashtag={"#durbar_rajshahi"}
          quote={quote}
          url={url}
        >
          <FacebookIcon round size={32} />
        </FacebookShareButton>

        {/* Whatsapp Share Button */}
        <WhatsappShareButton
          blankTarget={true}
          separator=":: "
          title={quote}
          url={url}
        >
          <WhatsappIcon round size={32} />
        </WhatsappShareButton>

        {/* Twitter Share Button */}
        <TwitterShareButton
          blankTarget={true}
          hashtags={["durbar_rajshahi"]}
          title={quote}
          url={url}
        >
          <TwitterIcon round size={32} />
        </TwitterShareButton>

        {/* LinkedIn Share Button */}
        <LinkedinShareButton
          blankTarget={true}
          source="Durbar News"
          summary={quote}
          title={quote}
          url={url}
        >
          <LinkedinIcon round size={32} />
        </LinkedinShareButton>

        {/* Telegram Share Button */}
        <TelegramShareButton blankTarget={true} title={quote} url={url}>
          <TelegramIcon round size={32} />
        </TelegramShareButton>

        {/* Reddit Share Button */}
        <RedditShareButton blankTarget={true} title={quote} url={url}>
          <RedditIcon round size={32} />
        </RedditShareButton>

        {/* Pinterest Share Button */}
        <PinterestShareButton
          blankTarget={true}
          media={`${process.env.BASE_URL}${thumbnail}`}
          url={url}
        >
          <PinterestIcon round size={32} />
        </PinterestShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
