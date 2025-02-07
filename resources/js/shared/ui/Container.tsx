import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

export function Container({
  children,
  className,
  align = "center",
}: PropsWithChildren<{
  className?: string;
  align?: "left" | "center" | "right";
}>) {
  return (
    <div
      className={cn(
        "max-w-7xl",
        {
          "mr-auto": align === "left",
          "mx-auto": align === "center",
          "ml-auto": align === "right",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
