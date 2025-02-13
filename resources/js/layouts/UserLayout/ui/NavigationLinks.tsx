import { cn } from "@/shared/lib/utils";
import { SevSULogo } from "@/shared/ui/SevSULogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "../state";

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
          "h-full relative flex items-center font-semibold text-muted-foreground transition-colors",
          {
            "hover:text-accent-foreground": !isActive,
            "text-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:bg-primary after:h-1 after:w-full after:rounded-tl-sm after:rounded-tr-sm":
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

export function NavigationLinks() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="h-full flex items-center gap-8">
      <Link href="/">
        <SevSULogo width={166} height={46} color="blue" />
      </Link>
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
        {isLoggedIn && (
          <>
            <NavigationLink
              href="/task-bank"
              isActive={window.location.pathname.startsWith("/task-bank")}
            >
              Банк задач
            </NavigationLink>
            <NavigationLink
              href="/vacancies"
              isActive={window.location.pathname.startsWith("/vacancies")}
            >
              Вакансии
            </NavigationLink>
          </>
        )}
      </ul>
    </nav>
  );
}
