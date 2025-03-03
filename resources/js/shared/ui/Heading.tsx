import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  family?: "myriad" | "minion";
  weight?: "semibold" | "bold";
  theme?: "dark" | "light";
};

export function Heading({
  children,
  level,
  className,
  family = "myriad",
  weight = "bold",
  theme = "dark",
}: PropsWithChildren<Props>) {
  const As = `h${level}` as keyof JSX.IntrinsicElements;
  const sizes = ["4xl", "3xl", "2xl", "xl", "lg", "base"] as const;
  const tracking = level <= 3 ? 'normal' : 'wider';

  return (
    <As
      className={cn(
        `font-${family} text-${
          sizes[level - 1]
        } font-${weight} tracking-${tracking}`,
        {
          "text-foreground": theme === "dark",
          "text-white": theme === "light",
        },
        className
      )}
    >
      {children}
    </As>
  );
}
