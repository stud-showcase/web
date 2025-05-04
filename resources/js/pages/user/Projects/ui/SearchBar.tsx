import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Search } from "lucide-react";
import { KeyboardEvent, ChangeEvent, useContext } from "react";
import { ProjectsFiltersContext } from "@/pages/user/Projects/context/ProjectsFiltersContext";
import { sendFilters } from "../util/sendFilters";

export function SearchBar() {
  const { filters, setFilters } = useContext(ProjectsFiltersContext);

  const handleSearch = () => {
    sendFilters(filters);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
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
        value={filters.search ?? ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button size="icon" variant="outline" onClick={handleSearch}>
        <Search strokeWidth={2} className="w-5 h-5" />
      </Button>
    </div>
  );
}
