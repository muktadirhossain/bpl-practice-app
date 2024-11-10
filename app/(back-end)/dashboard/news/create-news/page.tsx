import { Card, CardBody } from "@nextui-org/card";

import NewsForm from "./_component/NewsForm";

import { getAllCategories } from "@/service/category-service";

export default async function page() {
  const categories = await getAllCategories();

  return (
    <section>
      <h2 className="section-title">Add New News</h2>
      <Card className="my-4">
        <CardBody>
          <NewsForm data={JSON.stringify(categories)} />
        </CardBody>
      </Card>
    </section>
  );
}
