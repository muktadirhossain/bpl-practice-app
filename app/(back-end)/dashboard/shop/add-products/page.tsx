import { Card, CardBody, CardHeader } from "@nextui-org/card";

import ProductForm from "./_components/ProductForm";

import { getAllProductCategories } from "@/service/product-category-service";
import { cn } from "@/utils/cn";

const page = async () => {
  const categories = await getAllProductCategories();

  return (
    <div>
      <Card className="my-4">
        <CardHeader>
          <h2 className={cn("section-title", "text-3xl")}>Add New Products</h2>
        </CardHeader>
        <CardBody>
          <ProductForm categories={JSON.stringify(categories)} />
        </CardBody>
      </Card>
    </div>
  );
};

export default page;
