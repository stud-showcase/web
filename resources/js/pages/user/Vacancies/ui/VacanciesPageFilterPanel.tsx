import { Text } from "@/shared/ui/Text";
import { Checkbox } from "@/shared/ui/Checkbox";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { Separator } from "@/shared/ui/Separator";
import { FilterPanelWrapper } from "@/features/FilterPanelWrapper";

export function VacanciesPageFilterPanel() {
  const filters = [
    {
      label: "Задача",
      idPrefix: "task_title",
      options: [
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
      ],
    },
    {
      label: "Проект",
      idPrefix: "project_team",
      options: [
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
      ],
    },
  ];

  return (
    <FilterPanelWrapper>
      {filters.map(({ label, idPrefix, options }) => (
        <div key={idPrefix}>
          <Text className="font-medium pt-4 pb-3">{label}</Text>
          <ScrollArea className="h-40 w-full">
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={`${idPrefix}-${option}`} />
                  <label htmlFor={`${idPrefix}-${option}`}>
                    <Text className="text-sm">{option}</Text>
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="pt-3">
            <Separator />
          </div>
        </div>
      ))}
    </FilterPanelWrapper>
  );
}
