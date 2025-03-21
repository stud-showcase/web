import { Checkbox } from "@/shared/ui/Checkbox";
import { Text } from "@/shared/ui/Text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/Accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { ScrollArea } from "@/shared/ui/ScrollArea"; // Импорт ScrollArea
import { FilterPanelWrapper } from "@/features/FilterPanelWrapper";

export function ProjectsFilterPanel() {
  return (
    <FilterPanelWrapper>
      <Accordion
        type="multiple"
        defaultValue={["status", "complexity", "tags", "hiring"]}
        className="w-full"
      >
        <AccordionItem value="status">
          <AccordionTrigger>Статус</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["under_review", "in_progress", "completed"].map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox id={`status-${status}`} />
                  <label htmlFor={`status-${status}`}>
                    <Text variant="small">
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="complexity">
          <AccordionTrigger>Сложность</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["easy", "medium", "hard"].map((complexity) => (
                <div key={complexity} className="flex items-center space-x-2">
                  <Checkbox id={`complexity-${complexity}`} />
                  <label htmlFor={`complexity-${complexity}`}>
                    <Text variant="small">
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tags">
          <AccordionTrigger>Теги</AccordionTrigger>
          <AccordionContent>
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
                  "ecommerce",
                  "платежи",
                  "образование",
                  "видео",
                  "тесты",
                  "бронирование",
                  "уведомления",
                  "фитнес",
                  "здоровье",
                  "визуализация",
                  "дашборд",
                  "игра",
                  "дети",
                  "управление",
                  "команда",
                  "задачи",
                ].map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox id={`tag-${tag}`} />
                    <label htmlFor={`tag-${tag}`}>
                      <Text variant="small">{tag}</Text>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hiring">
          <AccordionTrigger>Набор в команду</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </FilterPanelWrapper>
  );
}
