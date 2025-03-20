import { Pagination } from "@/features/Pagination";
import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { ReactNode } from "react";

type Props = {
  heading: string;
  filterPanel: ReactNode;
  content: ReactNode;
};

export function FiltersItemsLayout({ heading, filterPanel, content }: Props) {
  return (
    <Container className="pt-8 pb-12">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-4">
        <Heading level={1}>{heading}</Heading>
      </div>

      <div className="grid mt-6 grid-cols-1 lg:grid-cols-4 gap-6">
        {filterPanel}
        <div className="lg:col-span-3">
          {content}
          <Pagination />
        </div>
      </div>
    </Container>
  );
}
