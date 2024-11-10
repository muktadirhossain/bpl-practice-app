import NewsTable from "./_components/NewsTable";

import { fetchNews } from "@/lib/fetch-news";

export const dynamic = "force-dynamic";

const page = async ({ searchParams }: any) => {
  const { data, totalPages } = await fetchNews(searchParams);

  return (
    <div>
      <h2 className="section-title leading-extra-loose">Durbar News</h2>
      <NewsTable data={JSON.stringify(data)} totalPages={totalPages} />
    </div>
  );
};

export default page;
