import { Link } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/shared/ui/Sheet";
import { SevSULogo } from "@/shared/ui/SevSULogo";
import { NavLinks } from "./NavLinks";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Переключить меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetTitle className="hidden"></SheetTitle>
        <SheetDescription className="hidden"></SheetDescription>
        <Link href="/admin/dashboard" className="px-3">
          <SevSULogo color="blue" width={204} height={88} />
        </Link>
        <nav className="grid gap-2 text-lg font-medium">
          <NavLinks mobile />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
