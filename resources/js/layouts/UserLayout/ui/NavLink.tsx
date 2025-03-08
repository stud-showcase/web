import { cn } from "@/shared/lib/utils";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

type Props = {
  href: string;
  withUnderline?: boolean;
  isActive?: boolean;
};

export function NavLink({
  children,
  href,
  withUnderline,
  isActive = false,
}: PropsWithChildren<Props>) {
  return (
    <li>
      <Link
        className={cn(
          "h-full relative flex items-center font-semibold text-muted-foreground transition-colors",
          {
            "hover:text-accent-foreground": !isActive,
            "text-primary": isActive,
            "after:content-[''] after:absolute after:left-0 after:bottom-0 after:bg-primary after:h-1 after:w-full after:rounded-tl-sm after:rounded-tr-sm":
              isActive && withUnderline,
          }
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
