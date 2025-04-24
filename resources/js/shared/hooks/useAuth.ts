import { usePage } from "@inertiajs/react";

export const useAuth = () => {
  const { auth } = usePage().props;

  // TODO: delete
  auth.user.role = "admin";
  
  return auth;
};
