import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type Props = {
  className?: string;
  family?: "myriad" | "minion";
  theme?: "dark" | "light";
};

export function Text({
  children,
  family = "myriad",
  className,
  theme = "dark",
}: PropsWithChildren<Props>) {
  return (
    <p
      className={cn(
        `font-${family} text-base font-normal tracking-wider`,
        {
          "text-content-default": theme === "dark",
          "text-white": theme === "light",
        },
        className
      )}
    >
      {children}
    </p>
  );
}
