import { Pagination } from "@/shared/components/Pagination";
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
    <Container withVerticalPaddings>
      <Heading level={1}>{heading}</Heading>
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
