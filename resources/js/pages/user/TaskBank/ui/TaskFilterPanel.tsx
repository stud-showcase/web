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

export function TasksFilterPanel() {
  return (
    <FilterPanelWrapper>
      <Accordion
        type="multiple"
        defaultValue={["complexity", "tags", "max_members", "customers"]}
        className="w-full"
      >
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
                        ? "Легкая"
                        : complexity === "medium"
                        ? "Средняя"
                        : "Сложная"}
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

        <AccordionItem value="max_members">
          <AccordionTrigger>Число участников</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Мин..." />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                    <SelectItem value={value.toString()}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Макс..." />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                    <SelectItem value={value.toString()}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="customers">
          <AccordionTrigger>Заказчики</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-40 w-full">
              <div className="space-y-2">
                {[
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
                ].map((customer) => (
                  <div key={customer} className="flex items-center space-x-2">
                    <Checkbox
                      id={`customer-${customer
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    />
                    <label
                      htmlFor={`customer-${customer
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      <Text variant="small">{customer}</Text>
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
