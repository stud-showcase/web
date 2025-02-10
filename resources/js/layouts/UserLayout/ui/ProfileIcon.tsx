import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import { LogOut, Settings, User } from "lucide-react";

export function ProfileIcon() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-lg">
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.5 28.3333C25.5 26.079 24.6045 23.917 23.0104 22.3229C21.4163 20.7289 19.2543 19.8333 17 19.8333C14.7457 19.8333 12.5837 20.7289 10.9896 22.3229C9.39553 23.917 8.5 26.079 8.5 28.3333"
              stroke="#364959"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.9999 19.8333C20.1295 19.8333 22.6666 17.2963 22.6666 14.1667C22.6666 11.0371 20.1295 8.5 16.9999 8.5C13.8703 8.5 11.3333 11.0371 11.3333 14.1667C11.3333 17.2963 13.8703 19.8333 16.9999 19.8333Z"
              stroke="#364959"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.9999 31.1667C24.824 31.1667 31.1666 24.824 31.1666 17C31.1666 9.17596 24.824 2.83333 16.9999 2.83333C9.17588 2.83333 2.83325 9.17596 2.83325 17C2.83325 24.824 9.17588 31.1667 16.9999 31.1667Z"
              stroke="#364959"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Кабалинов М. В.</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Профиль</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Перейти в админ-панель</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
