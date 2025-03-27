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
import { PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/shared/hooks/useAuth";

type Props = {
  mobile?: boolean;
};

export function ProfileIcon({ mobile }: PropsWithChildren<Props>) {
  const { user } = useAuth();

  const initials = `${user.firstName[0]}${user.lastName[0]}`;
  const lastNameAndInitials = `${user.lastName} ${user.firstName[0]}.${user.middleName[0]}`;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {mobile ? (
            <button className="inline-flex items-center justify-between">
              <div className="inline-flex gap-2 items-center">
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-primary text-sm">
                  {lastNameAndInitials}
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
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{lastNameAndInitials}</DropdownMenuLabel>
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
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выйти</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
