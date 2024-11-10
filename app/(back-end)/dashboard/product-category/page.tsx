// import AttributeArea from "./AttributeArea";
import ProductCategoryTable from "./_components/ProductCategoryTable";
import { fetchAllProductsCategories } from "@/lib/fetch-products-category";

const page = async ({ searchParams }: any) => {
  const { data, totalPages } = await fetchAllProductsCategories(searchParams);
  // const attributeArea = await AttributeArea();
  return (
    <div>
      <ProductCategoryTable
        data={JSON.stringify(data)}
        totalPages={totalPages}
      />
      {/* Attributes Area:: */}
      {/* {attributeArea} */}
    </div>
  );
};

export default page;
