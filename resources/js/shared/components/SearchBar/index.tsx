import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex gap-2 flex-1">
      <Input placeholder="Поиск по названию..." />
      <Button size="icon" variant="outline">
        <Search strokeWidth={2} className="w-5 h-5" />
      </Button>
    </div>
  );
}
