"use client";
import { Pagination } from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

const PaginationComponent = ({
  total,
  limit = 10,
}: {
  total: number;
  limit?: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const router = useRouter();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  const limitHandler = useCallback((event: any) => {
    const params = new URLSearchParams(searchParams);

    params.delete("search");
    params.set("limit", event.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  }, []);

  return (
    <div className="flex w-full justify-between items-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="warning"
        page={currentPage}
        total={total}
        onChange={(page) => {
          router.push(createPageURL(page));
        }}
      />
      <div className="flex justify-between items-center">
        {/* <span className="text-default-400 text-small">Total  users</span> */}
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            defaultValue={limit}
            onChange={limitHandler}
          >
            <option value="5">05</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="15">20</option>
            <option value="15">25</option>
            <option value="15">50</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default PaginationComponent;
