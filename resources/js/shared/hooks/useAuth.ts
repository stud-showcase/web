import { usePage } from "@inertiajs/react";

export const useAuth = () => {
  const { auth } = usePage().props;

  // TODO: delete
  if (auth.user) {
    auth.user.role = "admin";
  }

  return auth;
};
