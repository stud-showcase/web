import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { ReactNode } from "react";

type Props = {
  title: ReactNode | string;
  badges?: ReactNode;
  tags?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
};

export function CardWrapper({ title, badges, tags, content, footer }: Props) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ">
      <CardHeader className="border-b border-border p-3">
        <div className="flex md:items-center md:justify-between md:flex-row gap-4 flex-col">
          <CardTitle>{title}</CardTitle>
          {badges && <div className="flex flex-wrap gap-2">{badges}</div>}
        </div>
      </CardHeader>

      <CardContent>
        {content}

        {tags && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">{tags}</div>
          </div>
        )}
      </CardContent>

      {footer && (
        <CardFooter className="border-t p-3 bg-muted/20">
          <div className="flex gap-2 justify-end w-full">{footer}</div>
        </CardFooter>
      )}
    </Card>
  );
}
