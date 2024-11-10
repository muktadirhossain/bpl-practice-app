import Link from "next/link";
import { MoveUpRight } from "lucide-react";

import NewsCard from "./NewsCard";

import { getFrontPageNews } from "@/lib/fetch-news";

const NewsSection = async () => {
  const { data: allNews } = await getFrontPageNews();

  if (allNews.length < 1) {
    return null;
  }

  return (
    <section className="container mx-auto px-5 mt-10">
      <h6 className="section-subtitle">Latest News</h6>
      <h3 className="section-title mb-16">Durbar News</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-4 ">
        {allNews?.map((news) => <NewsCard key={news?.id} news={news} />)}
      </div>

      <div className="flex justify-center items-end my-6">
        <Link
          className="primary-btn px-5 py-3.5 rounded-md flex justify-between items-center gap-x-2"
          href={"/news"}
        >
          See more <MoveUpRight />
        </Link>
      </div>
    </section>
  );
};

export default NewsSection;

{
  /* <Button size="lg" variant="shadow" className="primary-btn text-black"
endContent={<ArrowBigRight />}
>
  See more
</Button> */
}
