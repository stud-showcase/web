import { FilterPanel, FilterBlock } from "@/shared/ui/FilterPanel";

export function ProjectsPageFilterPanel() {
  return (
    <FilterPanel>
      <FilterBlock
        title="Статус"
        idPrefix="status"
        options={["В рассмотрении", "В разработке", "Завершён"]}
      />
      <FilterBlock
        title="Сложность"
        idPrefix="complexity"
        options={["Легкий", "Средний", "Сложный"]}
      />
      <FilterBlock
        title="Теги"
        idPrefix="tag"
        options={[
          "веб",
          "дизайн",
          "интеграция",
          "мобильное",
          "социальные сети",
          "api",
          "внутренние системы",
          "аналитика",
          "отчетность",
          "crm",
          "бизнес",
        ]}
        scrollable
      />
      <FilterBlock
        title="Набор в команду"
        idPrefix="recruitment"
        options={["Все", "Набор открыт", "Набор закрыт"]}
      />
    </FilterPanel>
  );
}
