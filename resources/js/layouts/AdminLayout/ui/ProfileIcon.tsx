import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import { LogOut, Users } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";

export function ProfileIcon() {
  // TODO: указать сведения о пользователе, убрать моки
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2 items-center">
            <Button variant="ghost" size={"icon"}>
              <Avatar>
                <AvatarFallback>ИИ</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-58">
          <DropdownMenuLabel>Иванов И.И.</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">
              <Users className="mr-2 h-4 w-4" />
              <span>Подсистема пользователя</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="/logout">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Выйти</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
