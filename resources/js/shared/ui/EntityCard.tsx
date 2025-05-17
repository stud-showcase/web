import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { ReactNode } from "react";
import { Button } from "./Button";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

type Props = {
  title: ReactNode | string;
  subtitle?: ReactNode | string;
  badges?: ReactNode;
  tags?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  href: string;
};

export function EntityCard({
  title,
  subtitle,
  badges,
  tags,
  content,
  footer,
  href,
}: Props) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md bg-background">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {content}

        {badges && <div className="flex gap-2">{badges}</div>}
        {tags && <div className="flex gap-2">{tags}</div>}
      </CardContent>

      <CardFooter>
        <div className="flex gap-2">
          {footer}
          <Button asChild size="sm">
            <Link href={href}>
              Подробнее
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
