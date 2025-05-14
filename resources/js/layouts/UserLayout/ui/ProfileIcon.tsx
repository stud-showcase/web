import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/shared/hooks/useAuth";
import {
  getAvatartName,
  getShortName,
  isAdmin,
  isMentor,
} from "@/entities/User";
import { Text } from "@/shared/ui/Text";

export function ProfileIcon() {
  const { user } = useAuth();

  const avatarName = getAvatartName(user!.firstName, user!.lastName);
  const shortName = getShortName(user!.firstName, user!.secondName, user!.lastName);

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
                {avatarName}
              </AvatarFallback>
            </Avatar>
            <Text variant="small" className="font-semibold text-primary">
              {shortName}
            </Text>
            <ChevronsUpDown className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{shortName}</DropdownMenuLabel>
          {(isMentor(user) || isAdmin(user)) && (
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
