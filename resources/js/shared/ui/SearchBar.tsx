import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Search } from "lucide-react";
import { router } from "@inertiajs/react";
import { useState, KeyboardEvent } from "react";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    router.get(
      `/projects`,
      {
        search: searchQuery.trim() || undefined,
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const handleChange = (search: string) => {
    const params = new URLSearchParams(window.location.search);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );

    setSearchQuery(search);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 flex-1">
      <Input
        placeholder="Поиск по названию..."
        type="text"
        value={searchQuery}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button size="icon" variant="outline" onClick={handleSearch}>
        <Search strokeWidth={2} className="w-5 h-5" />
      </Button>
    </div>
  );
}
