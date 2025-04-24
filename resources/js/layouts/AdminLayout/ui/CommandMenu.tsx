import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  FolderKanban,
  Briefcase,
  Users,
  Search,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

import { Button } from "@/shared/ui/Button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/Command";

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigateTo = (url: string) => {
    setOpen(false);
    router.visit(url);
  };

  const logOut = () => (window.location.href = "/logout");

  return (
    <>
      <Button
        variant="outline"
        className="text-sm tracking-wide text-muted-foreground font-medium w-full sm:w-[326px] h-[36px]"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        Поиск...
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-2 rounded border bg-muted px-1 font-mono text-xs font-medium text-muted-foreground">
          <span>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Введите команду или поиск..." />
        <CommandList>
          <CommandEmpty>Результаты не найдены.</CommandEmpty>
          <CommandGroup heading="Навигация">
            <CommandItem onSelect={() => navigateTo("/admin/dashboard")}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Дашборд</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/admin/requests")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Заявки</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/admin/tasks")}>
              <ClipboardList className="mr-2 h-4 w-4" />
              <span>Банк задач</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/admin/projects")}>
              <FolderKanban className="mr-2 h-4 w-4" />
              <span>Проекты</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/admin/vacancies")}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Вакансии</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/admin/users")}>
              <Users className="mr-2 h-4 w-4" />
              <span>Пользователи</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Действия">
            <CommandItem onSelect={logOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Выйти</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
