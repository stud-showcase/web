import { NavLinks } from "./NavLinks";
import { Link } from "@inertiajs/react";
import { SevSULogo } from "@/shared/ui/SevSULogo";
import { SignInButton } from "./SignInButton";
import { MobileMenu } from "./MobileMenu";
import { useAuth } from "@/shared/hooks/useAuth";
import { Container } from "@/shared/ui/Container";
import { ProfileIcon } from "@/entities/User";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-background border-b h-[68px] sticky z-10 inset-0 ">
      <Container className="px-6 flex items-center justify-between h-full">
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
          {user ? <ProfileIcon role="user" variant="full" /> : <SignInButton />}
        </div>
        <div className="flex lg:hidden">
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
