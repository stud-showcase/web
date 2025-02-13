import { useContext } from "react";
import { AuthContext } from "../state";
import { Button } from "@/shared/ui/Button";

export function SignInButton() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  return (
    <Button
      onClick={login}
      className="bg-gradient-to-r from-[#1D71B8] to-[#1588E9] hover:opacity-95 text-white"
    >
      Войти
    </Button>
  );
}
