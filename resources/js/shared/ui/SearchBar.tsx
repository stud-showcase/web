import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Search } from "lucide-react";
import { ChangeEvent, KeyboardEvent } from "react";
import { cn } from "../lib/utils";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  className?: string;
};

export function SearchBar({
  value,
  placeholder = "Поиск...",
  onChange,
  onSearch,
  className,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className={cn("flex flex-1 gap-2", className)}>
      <Input
        value={value}
        placeholder={placeholder}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button variant="outline" onClick={onSearch}>
        <Search />
        Найти
      </Button>
    </div>
  );
}
