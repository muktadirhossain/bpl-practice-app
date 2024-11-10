import { getAllAttributesWithValues } from "@/lib/fetch-attribute";
import AttributeTable from "./_components/AttributeTable";

const AttributeArea = async () => {
  const data = await getAllAttributesWithValues();
  // console.log(data)
  return (
    <div>
      <h3 className="section-title text-4xl">Attributes</h3>
      <AttributeTable data={JSON.stringify(data)}  />
    </div>
  );
};

export default AttributeArea;
