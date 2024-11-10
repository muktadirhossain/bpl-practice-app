import { notFound } from "next/navigation";
import { Divider } from "@nextui-org/divider";
import { Card, CardBody } from "@nextui-org/card";

import ActionButtons from "./_components/ActionButtons";
import ImageSlider from "./_components/ImageSlider";

import { getProductCategoryById } from "@/lib/fetch-products";

interface PageProps {
  params: {
    productId: string;
  };
}

const ProductDetailsPage = async ({ params: { productId } }: PageProps) => {
  const product: any = await getProductCategoryById(productId);

  if (!product && !product?.id) {
    return notFound();
  }

  return (
    <div>
      <h3 className="section-title mb-4">Product Details</h3>

      <ImageSlider images={JSON.stringify(product?.images)} />
      <ActionButtons
        category={product?.category?.category}
        date={product?.createdAt}
        productId={JSON.stringify(product?._id)}
      />
      <Divider />
      <article>
        <Card>
          <CardBody>
            <h2 className="section-title text-2xl">{product?.title}</h2>
            <p>
              <strong>Item Code:</strong>
              {product?.itemCode}
            </p>
            <p>
              <strong>Price:</strong>
              {" " + product?.price} Tk.
            </p>
            <p>{product?.description}</p>
          </CardBody>
        </Card>
      </article>
    </div>
  );
};

export default ProductDetailsPage;
