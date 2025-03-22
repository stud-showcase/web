import { Button } from "@/shared/ui/Button";

export function SignInButton() {
  return (
    <Button asChild>
      <a href="/auth/keycloak/redirect">Войти</a>
    </Button>
  );
}
