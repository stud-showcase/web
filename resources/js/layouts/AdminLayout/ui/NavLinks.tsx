import {
  Archive,
  FilePlus,
  Folder,
  Home,
  LineChart,
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
        icon={Home}
        label="Дашборд"
        isActive={window.location.pathname.startsWith("/admin/dashboard")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/requests"
        icon={FilePlus}
        label="Заявки"
        isActive={window.location.pathname.startsWith("/admin/requests")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/tasks"
        icon={Archive}
        label="Банк задач"
        isActive={window.location.pathname.startsWith("/admin/tasks")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/projects"
        icon={Folder}
        label="Проекты"
        isActive={window.location.pathname.startsWith("/admin/projects")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/users"
        icon={Users}
        label="Пользователи"
        isActive={window.location.pathname.startsWith("/admin/users")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/analytics"
        isActive={window.location.pathname.startsWith("/admin/analytics")}
        icon={LineChart}
        label="Аналитика"
        mobile={mobile}
      />
    </>
  );
}
