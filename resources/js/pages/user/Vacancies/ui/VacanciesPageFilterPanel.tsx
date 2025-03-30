import { Text } from "@/shared/ui/Text";
import { FilterPanelWrapper } from "@/features/FilterPanelWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/Accordion";
import { Checkbox } from "@/shared/ui/Checkbox";
import { ScrollArea } from "@/shared/ui/ScrollArea";

export function VacanciesPageFilterPanel() {
  return (
    <FilterPanelWrapper>
      <Accordion type="multiple" defaultValue={["task_title", "project_team"]}>
        <AccordionItem value="task_title">
          <AccordionTrigger>Задача</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-40">
              <div className="space-y-2">
                {[
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
                ].map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox id={`task_title-${tag}`} />
                    <label htmlFor={`task_title-${tag}`}>
                      <Text variant="small">{tag}</Text>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="project_team">
          <AccordionTrigger>Проектная команда</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-40">
              <div className="space-y-2">
                {[
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
                ].map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox id={`project_team-${tag}`} />
                    <label htmlFor={`project_team-${tag}`}>
                      <Text variant="small">{tag}</Text>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </FilterPanelWrapper>
  );
}
