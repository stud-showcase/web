import { FilterBlock, FilterPanelWrapper } from "@/features/FilterPanel";

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
    <FilterPanelWrapper>
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
    </FilterPanelWrapper>
  );
}
