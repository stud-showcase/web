import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import {
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../state";
import { Link } from "@inertiajs/react";

export function ProfileIcon() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-primary text-white">
                ИИ
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm text-primary">
              Иван Иванов
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Иванов И.И.</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard">
              <Settings className="mr-2 h-4 w-4" />
              <span>Панель администратора</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4 text-destructive" />
            <span className="text-destructive">Выйти</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
