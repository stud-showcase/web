import { usePage } from "@inertiajs/react";

export const useAuth = () => {
  const { auth } = usePage().props;
  return auth;
};
