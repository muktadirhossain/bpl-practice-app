"use client";
import { Input } from "@nextui-org/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { SearchIcon } from "./icons";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const onClear = () => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    params.delete("search");
  };

  return (
    <Input
      isClearable
      classNames={{
        base: "w-full sm:max-w-[60%]",
        inputWrapper: "border-1.5 bg-default-50 inline",
        input: "text-sm py-6",
      }}
      placeholder="Search by name..."
      size="lg"
      startContent={<SearchIcon className="text-default-300" />}
      // value={filterValue}
      variant="bordered"
      onClear={onClear}
      onValueChange={handleSearch}
    />
  );
};

export default SearchInput;
