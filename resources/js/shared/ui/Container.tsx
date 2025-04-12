import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type Props = {
  withVerticalPaddings?: boolean;
  className?: string;
};

export function Container({
  children,
  withVerticalPaddings,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "max-w-6xl mx-auto px-6",
        { "pt-8 pb-16": withVerticalPaddings },
        className
      )}
    >
      {children}
    </div>
  );
}
