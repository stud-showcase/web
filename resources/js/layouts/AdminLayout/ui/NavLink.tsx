import { Link } from "@inertiajs/react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type NavLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  mobile?: boolean;
};

export function NavLink({
  href,
  icon: Icon,
  label,
  isActive = false,
  mobile = false,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        {
          "bg-muted text-primary": isActive,
          "text-muted-foreground hover:text-primary": !isActive,
        }
      )}
    >
      <Icon className={mobile ? "h-5 w-5" : "h-4 w-4"} />
      {label}
    </Link>
  );
}
