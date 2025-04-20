import { FilterBlock, FilterPanel } from "@/shared/ui/FilterPanel";

export function VacanciesPageFilterPanel() {
  const tags = [
    "web",
    "backend",
    "frontend",
    "design",
    "devops",
    "mobile",
    "database",
    "api",
    "security",
    "testing",
    "automation",
    "branding",
  ];

  return (
    <FilterPanel>
      <FilterBlock
        title="Задача"
        idPrefix="task_title"
        options={tags}
        scrollable
      />
      <FilterBlock
        title="Проект"
        idPrefix="project_team"
        options={tags}
        scrollable
      />
    </FilterPanel>
  );
}
