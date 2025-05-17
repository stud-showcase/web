import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "@/shared/hooks/useToast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function showToast({
  description,
  isDestructive,
}: {
  description: string;
  isDestructive: boolean;
}) {
  toast({
    title: isDestructive ? "Ошибка операции" : "Успех операции",
    duration: 3000,
    description,
    variant: isDestructive ? "destructive" : "success",
  });
}

export function showSuccessToast(description: string) {
  showToast({
    description,
    isDestructive: false,
  });
}

export function showErrorToast(description: string) {
  showToast({
    description,
    isDestructive: true,
  });
}
