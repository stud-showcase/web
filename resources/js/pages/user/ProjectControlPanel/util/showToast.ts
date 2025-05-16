import { toast } from "@/shared/hooks/useToast";

export function showToast(description: string, isDestructive: boolean = false) {
  toast({
    title: "Операция выполнена успешно",
    duration: 3000,
    description,
    variant: isDestructive ? "destructive" : "success",
  });
}
