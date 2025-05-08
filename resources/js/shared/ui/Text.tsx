import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type Variant = "default" | "lead" | "large" | "small" | "muted";

type Props = {
  variant?: Variant;
  className?: string;
};

const variantToElement: Record<Variant, keyof JSX.IntrinsicElements> = {
  default: "p",
  lead: "p",
  muted: "p",
  large: "div",
  small: "small",
};

const textStyles: Record<Variant, string> = {
  default: "leading-7",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium",
  muted: "text-sm text-muted-foreground",
};

export function Text({
  variant = "default",
  className,
  children,
}: PropsWithChildren<Props>) {
  const As = variantToElement[variant];
  return <As className={cn(textStyles[variant], className)}>{children}</As>;
}
