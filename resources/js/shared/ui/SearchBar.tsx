import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Search } from "lucide-react";
import { ChangeEvent, KeyboardEvent } from "react";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export function SearchBar({
  value,
  placeholder = "Поиск...",
  onChange,
  onSearch,
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
    <div className="flex gap-2 flex-1">
      <Input
        value={value}
        placeholder={placeholder}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button size="icon" variant="outline" onClick={onSearch}>
        <Search strokeWidth={2} className="w-5 h-5" />
      </Button>
    </div>
  );
}
