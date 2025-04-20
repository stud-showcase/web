import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/Pagination";
import { ReactNode } from "react";

type Props = {
  heading: string;
  filterPanel: ReactNode;
  content: ReactNode;
};

export function FiltersItemsLayout({ heading, filterPanel, content }: Props) {
  return (
    <Container withVerticalPaddings>
      <Heading level={1}>{heading}</Heading>
      <div className="grid mt-6 grid-cols-1 lg:grid-cols-4 gap-6">
        {filterPanel}
        <div className="lg:col-span-3">
          {content}
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Container>
  );
}
