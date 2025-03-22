import { useContext } from "react";
import { AuthContext } from "@/shared/state";
import { NavLink } from "./NavLink";

type Props = {
  mobile?: boolean;
};

export function NavLinks({ mobile }: Props) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <NavLink
        href="/"
        withUnderline={!mobile}
        isActive={window.location.pathname === "/"}
      >
        Главная
      </NavLink>
      <NavLink
        href="/projects"
        withUnderline={!mobile}
        isActive={window.location.pathname.startsWith("/projects")}
      >
        Проекты
      </NavLink>
      {isLoggedIn && (
        <>
          <NavLink
            href="/tasks"
            withUnderline={!mobile}
            isActive={window.location.pathname.startsWith("/tasks")}
          >
            Банк задач
          </NavLink>
        </>
      )}
    </>
  );
}
