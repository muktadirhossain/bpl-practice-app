import NewsCard from "../_components/news/NewsCard";

import PaginationComponent from "@/components/PaginationComponent";
import SearchInput from "@/components/SearchInput";
import { fetchNews } from "@/lib/fetch-news";

export const dynamic = "force-dynamic";

const page = async ({ searchParams }: any) => {
  const { data, totalPages } = await fetchNews(searchParams);

  return (
    <section className="min-h-screen w-full">
      <h2 className="section-title">Durbar News</h2>
      {data?.length > 0 ? (
        <>
          <div className="my-8">
            <SearchInput />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 my-8">
            {data?.map((news) => <NewsCard key={news?._id} news={news} />)}
          </div>
          <div>
            <PaginationComponent limit={10} total={Number(totalPages)} />
          </div>
        </>
      ) : (
        <div>
          <p className="text-center">😔😔😔</p>
          <p className="text-center text-3xl font-normal">No News Found !</p>
        </div>
      )}
    </section>
  );
};

export default page;
