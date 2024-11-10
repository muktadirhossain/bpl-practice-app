import { cn } from "@nextui-org/theme";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import dayjs from "dayjs";

import ShareButtons from "../../_components/global/ShareButtons";

import { newsBySlug } from "@/service/news-service";
import NotFound from "@/app/not-found";

export const dynamic = "force-dynamic";

const page = async ({
  params: { newsId },
}: {
  params: { newsId?: string };
}) => {
  const blog = await newsBySlug(newsId as string);

  if (!blog) return NotFound();

  return (
    <section>
      <Image
        alt={newsId as string}
        className={cn(
          "object-contain w-full h-[70vh] transition-transform rounded-md duration-500 ease-in-out mx-auto",
        )}
        height={500}
        src={blog?.cover_photo}
        width={500}
      />
      <div className="w-full date flex gap-2 items-center justify-start my-8">
        <CalendarDays className="h-5 w-5 " />
        <span>
          Published on : {dayjs(blog?.createdAt).format("DD MMM YYYY")}
        </span>
      </div>

      <h2
        className={cn(
          "font-bold text-2xl pb-1 sm:text-5xl text-center sm:text-left bg-gradient-to-b from-[#F58B1E] to-[#F1D848] bg-clip-text text-transparent leading-relaxed",
        )}
      >
        {blog?.headline}
      </h2>
      <ShareButtons thumbnail={blog?.cover_photo} title={blog?.title} />
      <div
        dangerouslySetInnerHTML={{ __html: blog?.content }}
        className="mt-8 container max-w-7xl mx-auto overflow-clip"
      />
    </section>
  );
};

export default page;
