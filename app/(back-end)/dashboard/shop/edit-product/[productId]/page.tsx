import ProductForm from "../../add-products/_components/ProductForm";

import { getProductCategoryById } from "@/lib/fetch-products";
import NotFound from "@/app/not-found";
import { getAllProductCategories } from "@/service/product-category-service";

interface PagePropr {
  params: { productId: string };
}

const page = async ({ params: { productId } }: PagePropr) => {
  const product: any = await getProductCategoryById(productId);

  if (!product) return NotFound();
  const categories = await getAllProductCategories();

  // const newProduct: object = { ...product, category: product?.category?._id };

  // console.log(product)
  // console.log(categories)

  return (
    <div>
      <h2 className="section-title">Product Edit</h2>
      <div>
        <ProductForm
          categories={JSON.stringify(categories)}
          product={JSON.stringify(product || {})}
        />
      </div>
    </div>
  );
};

export default page;
