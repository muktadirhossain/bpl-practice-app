import NewsCategoryTable from "./_components/NewsCategoryTable";

import { fetchAllCategories } from "@/lib/fetch-category";

const page = async ({ searchParams }: any) => {
  const { data, totalPages } = await fetchAllCategories(searchParams);

  return (
    <section>
      <h2 className="section-title leading-extra-loose">News Category</h2>
      <NewsCategoryTable data={JSON.stringify(data)} totalPages={totalPages} />
    </section>
  );
};

export default page;
