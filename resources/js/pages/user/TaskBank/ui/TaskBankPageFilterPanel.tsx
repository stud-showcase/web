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

export function TasksBankPageFilterPanel() {
  return (
    <FilterPanelWrapper>
      <div>
        <Text className="font-medium pt-4 pb-3">Сложность</Text>
        <div className="space-y-2">
          {["easy", "medium", "hard"].map((complexity) => (
            <div key={complexity} className="flex items-center space-x-2">
              <Checkbox id={`complexity-${complexity}`} />
              <label htmlFor={`complexity-${complexity}`}>
                <Text className="text-sm">
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
        <div className="pt-3">
          <Separator />
        </div>
      </div>

      <div>
        <Text className="font-medium pt-4 pb-3">Теги</Text>
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
        <Text className="font-medium pt-4 pb-3">Число участников</Text>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Мин..." />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                <SelectItem key={`min-${value}`} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Макс..." />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                <SelectItem key={`max-${value}`} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="pt-3">
          <Separator />
        </div>
      </div>

      <div>
        <Text className="font-medium pt-4 pb-3">Заказчики</Text>
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
              <div
                key={customer}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={`customer-${customer.toLowerCase().replace(/\s/g, "-")}`}
                />
                <label
                  htmlFor={`customer-${customer
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  <Text className="text-sm">{customer}</Text>
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="pt-3">
          <Separator />
        </div>
      </div>
    </FilterPanelWrapper>
  );
}
