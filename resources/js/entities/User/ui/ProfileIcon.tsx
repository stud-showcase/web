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
  ChevronDown,
  ChevronUp,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import { useAuth } from "@/shared/hooks/useAuth";
import { Text } from "@/shared/ui/Text";
import { getAvatartName, getFullName, getShortName } from "../util/names";
import { isAdmin, isMentor, isStudent } from "../util/roles";
import { useState } from "react";

export function ProfileIcon({ variant }: { variant: "user" | "admin" }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const avatarName = getAvatartName(user!.firstName, user!.lastName);
  const shortName = getShortName(
    user!.firstName,
    user!.secondName,
    user!.lastName
  );
  const fullName = getFullName(
    user!.firstName,
    user!.secondName,
    user!.lastName
  );

  const roleGroupName = isStudent(user)
    ? "Пользователь"
    : isMentor(user) || isAdmin(user)
    ? "Администратор"
    : "Неизвестный статус";

  return (
    <>
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <button className="flex gap-2 items-center outline-none">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-white">
                {avatarName}
              </AvatarFallback>
            </Avatar>
            <Text variant="small" className="font-semibold text-primary">
              {shortName}
            </Text>
            {isOpen ? (
              <ChevronUp className="text-primary h-4 w-4" />
            ) : (
              <ChevronDown className="text-primary h-4 w-4" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary text-white">
                  {avatarName}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fullName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {roleGroupName}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {variant === "user" && (isMentor(user) || isAdmin(user)) && (
            <DropdownMenuItem asChild>
              <Link href="/admin/applications">
                <Settings className="mr-2 h-4 w-4" />
                <span>Подсистема администратора</span>
              </Link>
            </DropdownMenuItem>
          )}
          {variant === "admin" && (
            <DropdownMenuItem asChild>
              <Link href="/">
                <Users className="mr-2 h-4 w-4" />
                <span>Подсистема пользователя</span>
              </Link>
            </DropdownMenuItem>
          )}
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
