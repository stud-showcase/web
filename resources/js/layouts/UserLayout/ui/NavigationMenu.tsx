import { cn } from "@/shared/lib/utils";
import { Link, usePage } from "@inertiajs/react";
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
          "h-full relative flex items-center font-semibold tracking-wider text-content-dark opacity-75 hover:opacity-100",
          {
            "text-accent-primary opacity-100 after:content-[''] after:absolute after:left-0 after:bottom-0 after:bg-accent-primary after:h-1 after:w-full after:rounded-tl-sm after:rounded-tr-sm":
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
  const { url } = usePage();

  return (
    <nav className="h-full">
      <ul className="h-full flex gap-4">
        <NavigationLink href="/" isActive={url === "/"}>
          Главная
        </NavigationLink>
        <NavigationLink href="/projects" isActive={url === "/projects"}>
          Проекты
        </NavigationLink>
      </ul>
    </nav>
  );
}
