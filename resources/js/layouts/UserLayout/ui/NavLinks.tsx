import { NavLink } from "./NavLink";

type Props = {
  mobile?: boolean;
};

export function NavLinks({ mobile }: Props) {
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
      <NavLink
        href="/tasks"
        withUnderline={!mobile}
        isActive={window.location.pathname.startsWith("/tasks")}
      >
        Банк задач
      </NavLink>
      <NavLink
        href="/vacancies"
        withUnderline={!mobile}
        isActive={window.location.pathname.startsWith("/vacancies")}
      >
        Вакансии
      </NavLink>
    </>
  );
}
