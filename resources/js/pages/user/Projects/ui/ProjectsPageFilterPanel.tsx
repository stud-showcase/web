import { Checkbox } from "@/shared/ui/Checkbox";
import { Text } from "@/shared/ui/Text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { Separator } from "@/shared/ui/Separator";
import { FilterPanelWrapper } from "@/features/FilterPanelWrapper";

export function ProjectsPageFilterPanel() {
  return (
    <FilterPanelWrapper>
      <div>
        <Text className="font-medium pt-4 pb-3">Статус</Text>
        <div className="space-y-2">
          {["under_review", "in_progress", "completed"].map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox id={`status-${status}`} />
              <label htmlFor={`status-${status}`}>
                <Text className="text-sm">
                  {status === "under_review"
                    ? "В рассмотрении"
                    : status === "in_progress"
                    ? "В разработке"
                    : "Завершён"}
                </Text>
              </label>
            </div>
          ))}
        </div>
        <div className="pt-3">
          <Separator />
        </div>
      </div>

      <div>
        <Text className="font-medium pt-4 pb-3">Сложность</Text>
        <div className="space-y-2">
          {["easy", "medium", "hard"].map((complexity) => (
            <div key={complexity} className="flex items-center space-x-2">
              <Checkbox id={`complexity-${complexity}`} />
              <label htmlFor={`complexity-${complexity}`}>
                <Text className="text-sm">
                  {complexity === "easy"
                    ? "Легкий"
                    : complexity === "medium"
                    ? "Средний"
                    : "Сложный"}
                </Text>
              </label>
            </div>
          ))}
        </div>
        <div className="pt-3">
          <Separator />
        </div>
      </div>

      <div>
        <Text className="font-medium pt-4 pb-3">Теги</Text>
        <ScrollArea className="h-40 w-full">
          <div className="space-y-2">
            {[
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
            ].map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox id={`tag-${tag}`} />
                <label htmlFor={`tag-${tag}`}>
                  <Text className="text-sm">{tag}</Text>
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="pt-3">
          <Separator />
        </div>
      </div>

      <div>
        <Text className="font-medium pt-4 pb-3">Набор в команду</Text>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="open">Набор открыт</SelectItem>
            <SelectItem value="closed">Набор закрыт</SelectItem>
          </SelectContent>
        </Select>
        <div className="pt-3">
          <Separator />
        </div>
      </div>
    </FilterPanelWrapper>
  );
}
