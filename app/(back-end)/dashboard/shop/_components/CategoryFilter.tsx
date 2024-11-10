"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const CategoryFilter = ({
  categories,
  fieldName = "category",
  label = "category",
}: {
  categories: any;
  fieldName?: string;
  label?: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handelCategorySelect = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term === "ALL") {
      params.delete(fieldName);
      replace(`${pathname}?${params.toString()}`);

      return;
    }
    params.set("page", "1");
    if (term) {
      params.set(fieldName, term);
    } else {
      params.delete(fieldName);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-w-48">
      <Select
        label="Select category"
        onChange={(e) => handelCategorySelect(e.target.value)}
      >
        <SelectItem key={"ALL"} value="ALL">
          All
        </SelectItem>

        {JSON.parse(categories).map((cat: any) => (
          <SelectItem key={cat.id} value={cat?.id}>
            {cat.category}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default CategoryFilter;
