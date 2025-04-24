import { Link } from "@inertiajs/react";
import { SevSULogo } from "@/shared/ui/SevSULogo";
import { NavLinks } from "./NavLinks";

export function Sidebar() {
  return (
    <div className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <SevSULogo color="blue" width={166} height={46} />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLinks />
          </nav>
        </div>
      </div>
    </div>
  );
}
