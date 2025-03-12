import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "@/shared/state";
import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";

type Props = {
  mobile?: boolean;
};

export function ProfileIcon({ mobile }: PropsWithChildren<Props>) {
  const { setIsLoggedIn } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {mobile ? (
            <button className="inline-flex items-center justify-between">
              <div className="inline-flex gap-2 items-center">
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">
                    ИИ
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-primary text-sm">
                  Иванов И.И.
                </span>
              </div>
              <div className="inline text-primary">
                <ChevronsUpDown className="h-5 w-5" />
              </div>
            </button>
          ) : (
            <div className="flex gap-2 items-center">
              <Button variant="ghost" size={"icon"}>
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">
                    ИИ
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Иванов И.И.</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Личный кабинет</span>
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
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выйти</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
