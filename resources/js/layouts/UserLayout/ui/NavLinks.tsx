import { NavLink } from "./NavLink";

type Props = {
  mobile?: boolean;
};

export function NavLinks({ mobile }: Props) {
  const pathname = window.location.pathname;

  return (
    <>
      <NavLink
        href="/"
        withUnderline={!mobile}
        isActive={pathname === "/"}
      >
        Главная
      </NavLink>
      <NavLink
        href="/projects"
        withUnderline={!mobile}
        isActive={
          pathname.startsWith("/projects") ||
          pathname.startsWith("/myProjects")
        }
      >
        Проекты
      </NavLink>
      <NavLink
        href="/tasks"
        withUnderline={!mobile}
        isActive={pathname.startsWith("/tasks")}
      >
        Банк задач
      </NavLink>
      <NavLink
        href="/vacancies"
        withUnderline={!mobile}
        isActive={pathname.startsWith("/vacancies")}
      >
        Вакансии
      </NavLink>
      <NavLink
        href="/application"
        withUnderline={!mobile}
        isActive={pathname.startsWith("/application")}
      >
        Заявка
      </NavLink>
    </>
  );
}
