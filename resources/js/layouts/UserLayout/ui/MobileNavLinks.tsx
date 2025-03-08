import { useContext } from "react";
import { AuthContext } from "../state";
import { NavLink } from "./NavLink";

export function MobileNavLinks() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav>
      <ul className="flex flex-col gap-4">
        <NavLink href="/" isActive={window.location.pathname === "/"}>
          Главная
        </NavLink>
        <NavLink
          href="/projects"
          isActive={window.location.pathname === "/projects"}
        >
          Проекты
        </NavLink>
        {isLoggedIn && (
          <>
            <NavLink
              href="/task-bank"
              isActive={window.location.pathname === "/task-bank"}
            >
              Банк задач
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
}
