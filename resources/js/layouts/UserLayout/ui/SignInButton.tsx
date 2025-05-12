import { Button } from "@/shared/ui/Button";

export function SignInButton() {
  return (
    <Button asChild className="border-2 border-primary text-primary bg-background hover:bg-primary hover:text-white transition-colors">
      <a href="/auth/keycloak/redirect">Войти</a>
    </Button>
  );
}
