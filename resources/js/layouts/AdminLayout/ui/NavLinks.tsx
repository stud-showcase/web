import {
  ClipboardList,
  FileText,
  FolderKanban,
  Users,
} from "lucide-react";
import { NavLink } from "./NavLink";

type Props = {
  mobile?: boolean;
};

export function NavLinks({ mobile }: Props) {
  const pathname = window.location.pathname;

  return (
    <>
      <NavLink
        href="/admin/applications"
        icon={FileText}
        label="Заявки"
        isActive={
          pathname.startsWith("/admin/applications") ||
          pathname.startsWith("/admin/myApplications")
        }
        mobile={mobile}
      />
      <NavLink
        href="/admin/tasks"
        icon={ClipboardList}
        label="Банк задач"
        isActive={pathname.startsWith("/admin/tasks")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/projects"
        icon={FolderKanban}
        label="Проекты"
        isActive={pathname.startsWith("/admin/projects")}
        mobile={mobile}
      />
      <NavLink
        href="/admin/users"
        icon={Users}
        label="Пользователи"
        isActive={pathname.startsWith("/admin/users")}
        mobile={mobile}
      />
    </>
  );
}
