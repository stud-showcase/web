import { cn } from "@/shared/lib/utils";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

type Props = {
  href: string;
  isActive?: boolean;
};

export function NavigationLink({
  children,
  href,
  isActive = false,
}: PropsWithChildren<Props>) {
  return (
    <li>
      <Link
        className={cn(
          "h-full relative flex items-center font-semibold tracking-wide text-content-link",
          {
            "hover:text-content-link-active": !isActive,
            "text-accent-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:bg-accent-primary after:h-1 after:w-full after:rounded-tl-sm after:rounded-tr-sm":
              isActive,
          }
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

export function NavigationMenu() {
  return (
    <nav className="h-full">
      <ul className="h-full flex gap-4">
        <NavigationLink href="/" isActive={window.location.pathname === "/"}>
          Главная
        </NavigationLink>
        <NavigationLink
          href="/projects"
          isActive={window.location.pathname.startsWith("/projects")}
        >
          Проекты
        </NavigationLink>
      </ul>
    </nav>
  );
}
