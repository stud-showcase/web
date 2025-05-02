import { TaskTag } from "@/entities/Task";
import { FilterPanel, FilterBlock } from "@/shared/ui/FilterPanel";

export function ProjectsPageFilterPanel({ tags }: { tags: TaskTag[] }) {
  const tagNames = tags.map((tag) => tag.name);

  return (
    <FilterPanel>
      <FilterBlock
        title="Статус"
        idPrefix="status"
        options={["В ожидании", "В работе", "Завершен"]}
      />
      <FilterBlock
        title="Сложность"
        idPrefix="complexity"
        options={["Легкий", "Средний", "Сложный"]}
      />
      <FilterBlock title="Теги" idPrefix="tag" options={tagNames} scrollable />
      <FilterBlock
        title="Набор в команду"
        idPrefix="recruitment"
        options={["Открыт", "Закрыт"]}
      />
    </FilterPanel>
  );
}
