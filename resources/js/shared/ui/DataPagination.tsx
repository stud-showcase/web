// @ts-nocheck
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/shared/ui/Pagination";
import { ServerPaginatedData } from "../types/ServerPaginatedData";

type PaginationProps<TData> = {
  paginatedData: ServerPaginatedData<TData>;
  className?: string;
};

export function DataPagination<TData>({
  paginatedData,
  className,
}: PaginationProps<TData>) {
  const { currentPage, lastPage, links } = paginatedData;

  const previousUrl = links[currentPage - 1] || null;
  const nextUrl = links[currentPage + 1] || null;

  const generatePageRange = () => {
    const range = [];
    const delta = 2;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(lastPage, currentPage + delta);

    if (left > 1) {
      range.push(1);
      if (left > 2) {
        range.push(-1);
      }
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < lastPage) {
      if (right < lastPage - 1) {
        range.push(-1);
      }
      range.push(lastPage);
    }

    return range;
  };

  if (lastPage === 1) return;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={previousUrl || undefined}
            className={!previousUrl ? "opacity-50 cursor-not-allowed" : ""}
          />
        </PaginationItem>

        {generatePageRange().map((page, index) => (
          <PaginationItem key={index}>
            {page === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={links[page] || "#"}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={nextUrl || undefined}
            className={!nextUrl ? "opacity-50 cursor-not-allowed" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
