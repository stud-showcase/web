import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type Props = {
  className?: string;
};

export function Container({ children, className }: PropsWithChildren<Props>) {
  return (
    <div className={cn("max-w-[1392px] mx-auto px-6", className)}>
      {children}
    </div>
  );
}
