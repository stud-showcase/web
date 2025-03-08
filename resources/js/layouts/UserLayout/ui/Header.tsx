import { NavigationLinks } from "./NavigationLinks";
import { LeaveRequestButton } from "./LeaveRequestButton";
import { SignInButton } from "./SignInButton";
import { AuthContext } from "../state";
import { useState } from "react";
import { ProfileIcon } from "./ProfileIcon";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" ? true : false
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="px-6 shadow-sm border h-[68px] rounded-lg flex items-center justify-between">
        <NavigationLinks />
        <div className="flex gap-4 items-center">
          <LeaveRequestButton />
          {isLoggedIn ? <ProfileIcon /> : <SignInButton />}
        </div>
      </div>
    </AuthContext.Provider>
  );
}
