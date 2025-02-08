import { SevSULogo } from "@/shared/ui/SevSULogo";
import { NavigationMenu } from "./NavigationMenu";
import { ProfileIcon } from "./ProfileIcon";
import { RequestLink } from "./RequestLink";
import { Link } from "@inertiajs/react";
import { Divider } from "./Divider";

export function Header() {
  return (
    <div className="px-6 top-8 left-6 bg-dominant-secondary h-[68px] rounded-lg flex items-center justify-between border">
      <Link href="/">
        <SevSULogo width={166} height={46} color="blue" />
      </Link>
      <NavigationMenu />
      <div className="flex items-center">
        <RequestLink />
        <Divider />
        <ProfileIcon />
      </div>
    </div>
  );
}
