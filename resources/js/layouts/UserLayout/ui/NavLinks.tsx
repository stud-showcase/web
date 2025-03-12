import { useContext } from "react";
import { AuthContext } from "@/shared/state";
import { NavLink } from "./NavLink";

export function NavLinks() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="h-full">
      <ul className="h-full lg:flex gap-4 hidden">
        <NavLink
          href="/"
          withUnderline
          isActive={window.location.pathname === "/"}
        >
          Главная
        </NavLink>
        <NavLink
          href="/projects"
          withUnderline
          isActive={window.location.pathname.startsWith("/projects")}
        >
          Проекты
        </NavLink>
        {isLoggedIn && (
          <>
            <NavLink
              href="/task-bank"
              withUnderline
              isActive={window.location.pathname.startsWith("/task-bank")}
            >
              Банк задач
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
}
