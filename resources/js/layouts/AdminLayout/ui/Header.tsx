import { MobileMenu } from "./MobileMenu";
import { CommandMenu } from "./CommandMenu";
import { ProfileIcon } from "@/entities/User";
import { PropsWithChildren } from "react";

export function Header({ children }: PropsWithChildren) {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b px-4 lg:h-[66px] lg:px-6">
      <div className="flex items-center gap-4">
        <MobileMenu />
        {children}
      </div>
      <div className="flex items-center gap-4">
        <CommandMenu />
        <ProfileIcon role="admin" variant="short" />
      </div>
    </header>
  );
}
