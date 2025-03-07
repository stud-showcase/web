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
    <Button onClick={login}>
      Войти
    </Button>
  );
}
