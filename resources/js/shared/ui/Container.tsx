import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type Props = {
  className?: string;
  align?: "left" | "center" | "right";
};

export function Container({
  children,
  className,
  align = "center",
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "max-w-[1392px]",
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
