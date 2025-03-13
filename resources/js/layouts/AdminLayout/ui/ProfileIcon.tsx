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
import { useContext } from "react";
import { AuthContext } from "@/shared/state";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";

export function ProfileIcon() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.visit("/");
  };

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
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выйти</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
