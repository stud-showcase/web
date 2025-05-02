import { Button } from "@/shared/ui/Button";
import { ReactNode } from "react";
import { Text } from "@/shared/ui/Text";
import { Checkbox } from "@/shared/ui/Checkbox";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { Separator } from "@/shared/ui/Separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/Select";

type FilterBlockProps = {
  title: string;
  options: string[];
  idPrefix: string;
  scrollable?: boolean;
};

export function FilterBlock({
  title,
  options,
  idPrefix,
  scrollable = false,
}: FilterBlockProps) {
  const content = (
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
  );

  return (
    <div>
      <Text className="font-semibold pt-4 pb-3">{title}</Text>
      {scrollable ? (
        <ScrollArea className="max-h-40 w-full">{content}</ScrollArea>
      ) : (
        content
      )}
      <div className="pt-3">
        <Separator />
      </div>
    </div>
  );
}

type RangeFilterBlockProps = {
  title: string;
  range: number[];
};

export function RangeFilterBlock({ title, range }: RangeFilterBlockProps) {
  return (
    <div>
      <Text className="font-semibold pt-4 pb-3">{title}</Text>
      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Мин..." />
          </SelectTrigger>
          <SelectContent>
            {range.map((value) => (
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
            {range.map((value) => (
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
  );
}

export function FilterPanel({ children }: { children: ReactNode }) {
  return (
    <div className="lg:col-span-1 bg-white border rounded-lg px-4 pb-4">
      <div className="sticky top-0 left-0">
        {children}
        <div className="flex flex-col xl:flex-row gap-2 mt-4">
          <Button variant="outline" className="w-full">
            Сбросить
          </Button>
          <Button className="w-full">Применить</Button>
        </div>
      </div>
    </div>
  );
}
