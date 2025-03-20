import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { ReactNode } from "react";

type Props = {
  heading: string;
  searchBar: ReactNode;
  filterPanel: ReactNode;
  items: ReactNode;
};

export function FiltersItemsLayout({
  heading,
  searchBar,
  filterPanel,
  items,
}: Props) {
  return (
    <>
      <Container className="pt-8 pb-12">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-4">
          <Heading level={1}>{heading}</Heading>
          {searchBar}
        </div>

        <div className="grid mt-6 grid-cols-1 lg:grid-cols-4 gap-6">
          {filterPanel}
          {items}
        </div>
      </Container>
    </>
  );
}
