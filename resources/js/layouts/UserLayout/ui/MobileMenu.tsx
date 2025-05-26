import { Button } from "@/shared/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/Sheet";
import { Menu } from "lucide-react";
import { Separator } from "@/shared/ui/Separator";
import { SignInButton } from "./SignInButton";
import { NavLinks } from "./NavLinks";
import { useAuth } from "@/shared/hooks/useAuth";
import { ProfileIcon } from "@/entities/User";

export function MobileMenu() {
  const { user } = useAuth();

  return (
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
          <nav>
            <ul className="flex flex-col gap-4 text-lg">
              <NavLinks mobile />
            </ul>
          </nav>
          <div className="flex flex-col gap-4">
            <Separator />
            {user ? (
              <ProfileIcon role="user" variant="short" />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
