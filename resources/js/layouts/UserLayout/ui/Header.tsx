import { NavLinks } from "./NavLinks";
import { LeaveRequestButton } from "./LeaveRequestButton";
import { ProfileIcon } from "./ProfileIcon";
import { Link } from "@inertiajs/react";
import { SevSULogo } from "@/shared/ui/SevSULogo";
import { SignInButton } from "./SignInButton";
import { MobileMenu } from "./MobileMenu";
import { useAuth } from "@/shared/hooks/useAuth";

export function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <header className="px-6 bg-white border h-[68px] rounded-lg flex items-center justify-between">
      <div className="h-full flex items-center gap-8">
        <Link href="/">
          <SevSULogo width={166} height={46} color="blue" />
        </Link>
        <nav className="h-full">
          <ul className="h-full lg:flex gap-4 hidden text-sm">
            <NavLinks />
          </ul>
        </nav>
      </div>
      <div className="lg:flex gap-4 items-center hidden">
        <LeaveRequestButton />
        {isLoggedIn ? <ProfileIcon /> : <SignInButton />}
      </div>
      <div className="flex lg:hidden">
        <MobileMenu />
      </div>
    </header>
  );
}
