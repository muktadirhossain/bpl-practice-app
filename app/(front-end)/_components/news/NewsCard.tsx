import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { cn } from "@nextui-org/theme";
import { CalendarDays, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import striptags from "striptags";
import dayjs from "dayjs";

import { title } from "@/components/primitives";

type NewsCategory = {
  category: string;
};
type NewsCardProps = {
  news: {
    id: number;
    headline: string;
    slug: string;
    cover_photo: string;
    content: string;
    category: NewsCategory;
    createdAt: string;
  };
  imageStyles?: string;
};

const NewsCard: React.FC<NewsCardProps> = ({ news, imageStyles }) => {
  // Convert HTML content to plain text and limit to 400 characters
  const plainTextContent = striptags(news.content);
  const truncatedContent = plainTextContent.substring(0, 400) + "...";

  return (
    <Card className="cursor-pointer">
      <Image
        alt={news?.headline}
        className={cn(
          "w-full h-[300px] object-fill transition-transform duration-500 ease-in-out",
          "hover:scale-105",
          imageStyles,
        )}
        height={400}
        src={news?.cover_photo}
        width={400}
      />
      <CardBody>
        <div className="w-full flex justify-start items-center">
          <Chip color="warning" variant="shadow">
            {news?.category?.category}
          </Chip>
        </div>
        <div className="w-full date flex gap-2 items-center justify-start my-3">
          <CalendarDays className="h-5 w-5 " />
          <span>{dayjs(news?.createdAt).format("MMM DD YYYY")}</span>
        </div>

        <h4
          className={title({
            size: "xs",
            class: "text-left text-4xl capitalize",
          })}
        >
          {news?.headline}
        </h4>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium provident, recusandae culpa voluptatibus sapiente neque asperiores minus sequi porro! Provident nemo soluta quos laborum labore excepturi, quae laboriosam obcaecati qui quam facere dignissimos iste et, numquam tempora? Incidunt expedita neque sunt, harum ipsum eos distinctio quidem exercitationem quibusdam qui at corporis hic laboriosam alias quis nostrum voluptas, eius nemo! Earum repellendus </p> */}
      </CardBody>
      <CardFooter>
        <div className="flex justify-start items-center w-full z-10">
          <Link href={`/durbar-news/${news?.slug}`}>
            <Button
              className="text-black font-semibold bg-gradient-to-b from-[#F58B1E] to-[#F1D848] rounded-md"
              endContent={<MoveUpRight className="h-5 w-5 " />}
            >
              Read More...
            </Button>
          </Link>
        </div>
        <div className="h-36 w-36 bg-gradient-to-b from-durbarDeep/50 to-durbarLight/50 rounded-full absolute -bottom-1 -right-1 blur-[80px]" />
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
