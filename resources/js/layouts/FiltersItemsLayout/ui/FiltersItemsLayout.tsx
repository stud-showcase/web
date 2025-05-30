import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { ReactNode } from "react";

type Props = {
  heading: string;
  filtersSlot: ReactNode;
  contentSlot: ReactNode;
};

export function FiltersItemsLayout({
  heading,
  filtersSlot,
  contentSlot,
}: Props) {
  return (
    <Container withVerticalPaddings>
      <Heading level={1}>{heading}</Heading>
      <div className="grid mt-6 grid-cols-1 lg:grid-cols-7 gap-6">
        {filtersSlot}
        <div className="lg:col-span-5">{contentSlot}</div>
      </div>
    </Container>
  );

}

