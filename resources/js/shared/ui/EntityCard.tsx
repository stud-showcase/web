import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { ReactNode } from "react";

type Props = {
  title: ReactNode | string;
  subtitle?: ReactNode | string;
  badges?: ReactNode;
  tags?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
};

export function EntityCard({
  title,
  subtitle,
  badges,
  tags,
  content,
  footer,
}: Props) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {content}

        {badges && <div className="flex gap-2">{badges}</div>}
        {tags && <div className="flex gap-2">{tags}</div>}
      </CardContent>

      {footer && (
        <CardFooter>
          <div className="flex gap-2 flex-1">{footer}</div>
        </CardFooter>
      )}
    </Card>
  );
}
