import { NavLinks } from "./NavLinks";
import { LeaveRequestButton } from "./LeaveRequestButton";
import { SignInButton } from "./SignInButton";
import { AuthContext } from "@/shared/state";
import { useState } from "react";
import { UserProfileIcon } from "./UserProfileIcon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/Sheet";
import { Button } from "@/shared/ui/Button";
import { Menu } from "lucide-react";
import { Link } from "@inertiajs/react";
import { SevSULogo } from "@/shared/ui/SevSULogo";
import { MobileNavLinks } from "./MobileNavLinks";
import { Separator } from "@/shared/ui/Separator";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" ? true : false
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="px-6 shadow-sm border h-[68px] rounded-lg flex items-center justify-between">
        <div className="h-full flex items-center gap-8">
          <Link href="/">
            <SevSULogo width={166} height={46} color="blue" />
          </Link>
          <NavLinks />
        </div>
        <div className="lg:flex gap-4 items-center hidden">
          <LeaveRequestButton />
          {isLoggedIn ? <UserProfileIcon /> : <SignInButton />}
        </div>
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Переключить меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-64">
              <SheetTitle className="hidden"></SheetTitle>
              <SheetDescription className="hidden"></SheetDescription>
              <div className="h-full flex justify-between flex-col gap-8">
                <MobileNavLinks />
                <div className="flex flex-col gap-4">
                  <LeaveRequestButton />
                  <Separator />
                  {isLoggedIn ? <UserProfileIcon mobile /> : <SignInButton />}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
