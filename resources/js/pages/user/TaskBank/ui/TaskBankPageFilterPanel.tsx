import { FilterBlock, FilterPanelWrapper, RangeFilterBlock } from "@/features/FilterPanel";

export function TasksBankPageFilterPanel() {
  return (
    <FilterPanelWrapper>
      <FilterBlock
        title="Сложность"
        idPrefix="complexity"
        options={["Легкая", "Средняя", "Сложная"]}
      />
      <FilterBlock
        title="Теги"
        idPrefix="tag"
        options={[
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
        ]}
        scrollable
      />
      <RangeFilterBlock title="Число участников" range={[1,2,3,4,5,6,7,8,9]} />
      <FilterBlock
        title="Заказчики"
        idPrefix="customer"
        options={[
          "ООО МаркетПлюс",
          "TechCorp",
          "AppVenture",
          "DataFlow Inc.",
          "Creative Agency",
          "E-Shop Ltd.",
          "BrandWorks",
          "SecureSoft",
          "SupportPro",
          "DocuTech",
          "Web Innovate",
          "NextGen Solutions",
        ]}
        scrollable
      />
    </FilterPanelWrapper>
  );
}
