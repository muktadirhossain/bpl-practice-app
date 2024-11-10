import ProductsTable from "./_components/ProductsTable";

import { fetchProducts } from "@/lib/fetch-products";
import { getAllProductCategories } from "@/service/product-category-service";

const page = async ({ searchParams }: any) => {
  const { data: products, totalPages } = await fetchProducts(searchParams);
  const categories = await getAllProductCategories();

  return (
    <section className="min-h-[calc(100vh-150px)]">
      <ProductsTable
        categories={JSON.stringify(categories)}
        data={JSON.stringify(products)}
        totalPages={totalPages}
      />
    </section>
  );
};

export default page;
