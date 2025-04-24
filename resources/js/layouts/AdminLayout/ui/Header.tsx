import { ProfileIcon } from "./ProfileIcon";
import { MobileMenu } from "./MobileMenu";
import { CommandMenu } from "./CommandMenu";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <MobileMenu />
      <div className="w-full flex-1">
       <CommandMenu />
      </div>
      <ProfileIcon />
    </header>
  );
}
