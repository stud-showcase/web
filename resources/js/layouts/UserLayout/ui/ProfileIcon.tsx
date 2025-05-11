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
  ChevronsUpDown,
  LogOut,
  Settings,
} from "lucide-react";
import { PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/shared/hooks/useAuth";
import { hasRole } from "@/entities/User";
import { Text } from "@/shared/ui/Text";

type Props = {
  mobile?: boolean;
};

export function ProfileIcon({ mobile }: PropsWithChildren<Props>) {
  const { user } = useAuth();

  const initials = `${user!.firstName[0]}${user!.lastName ? user!.lastName[0] : ""}`;

  let fullName = `${user!.secondName} ${user!.firstName[0]}.`;
  if (user!.lastName) {
    fullName += `${user!.lastName[0]}.`;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-13 inline-flex items-center justify-between"
          >
            <Avatar>
              <AvatarFallback className="bg-primary text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Text variant="small" className="font-semibold text-primary">
              {fullName}
            </Text>
            <ChevronsUpDown className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{fullName}</DropdownMenuLabel>
          {(hasRole(user, "mentor") || hasRole(user, "admin")) && (
            <DropdownMenuItem asChild>
              <Link href="/admin/dashboard">
                <Settings className="mr-2 h-4 w-4" />
                <span>Панель администратора</span>
              </Link>
            </DropdownMenuItem>
          )}
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
