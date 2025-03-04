import { cn } from "@/shared/lib/utils";
import { PropsWithChildren } from "react";

type Level = 1 | 2 | 3 | 4;

type Props = {
  level: Level;
  className?: string;
};

const headingStyles: Record<Level, string> = {
  1: "text-4xl font-bold lg:text-5xl",
  2: "text-3xl font-semibold",
  3: "text-2xl font-semibold",
  4: "text-xl font-semibold",
};

const baseStyles = "scroll-m-20 tracking-tight";

export function Heading({
  level,
  className,
  children,
}: PropsWithChildren<Props>) {
  const As = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <As className={cn(baseStyles, headingStyles[level], className)}>
      {children}
    </As>
  );
}
