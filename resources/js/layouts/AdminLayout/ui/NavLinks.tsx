import {
  Briefcase,
  ClipboardList,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { NavLink } from "./NavLink";

type Props = {
  mobile?: boolean;
};

export function NavLinks({ mobile }: Props) {
  return (
    <>
      <NavLink
        href="/admin/dashboard"
        icon={LayoutDashboard}
        label="Дашборд"
        isActive={window.location.pathname.startsWith("/admin/dashboard")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/applications"
        icon={FileText}
        label="Заявки"
        isActive={window.location.pathname.startsWith("/admin/applications")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/tasks"
        icon={ClipboardList}
        label="Банк задач"
        isActive={window.location.pathname.startsWith("/admin/tasks")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/projects"
        icon={FolderKanban}
        label="Проекты"
        isActive={window.location.pathname.startsWith("/admin/projects")}
        mobile={mobile}
      />
        <NavLink
        href="/admin/vacancies"
        icon={Briefcase}
        label="Вакансии"
        isActive={window.location.pathname.startsWith("/admin/vacancies")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/users"
        icon={Users}
        label="Пользователи"
        isActive={window.location.pathname.startsWith("/admin/users")}
        mobile={mobile}
      />
    </>
  );
}
