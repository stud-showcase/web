import { PropsWithChildren, ReactNode, useState } from "react";
import { Button } from "./Button";
import { Text } from "./Text";
import { Checkbox } from "./Checkbox";
import { ScrollArea } from "./ScrollArea";
import { Separator } from "./Separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/Select";
import { Label } from "./Label";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

type BaseFilterBlockProps = {
  title: string;
  scrollable?: boolean;
};

function BaseFilterBlock({
  scrollable = false,
  title,
  children,
}: PropsWithChildren<BaseFilterBlockProps>) {
  return (
    <div className="border-b pb-4">
      <Text className="font-semibold">{title}</Text>
      <div className="mt-3">
        {scrollable ? (
          <ScrollArea className="flex flex-col max-h-40">{children}</ScrollArea>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

type Option = {
  id: number | string;
  name: string;
}

type FilterBlockProps = BaseFilterBlockProps & {
  options: Option[];
  idPrefix: string;
  values: string[];
  onChange: (values: string[]) => void;
};

export function FilterBlock({
  title,
  options,
  idPrefix,
  values,
  onChange,
  scrollable = false,
}: FilterBlockProps) {
  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    const newValues = checked
      ? [...values, optionId]
      : values.filter((v) => v !== optionId);
    onChange(newValues);
  };

  return (
    <BaseFilterBlock title={title} scrollable={scrollable}>
      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={`${idPrefix}-${option.id}`}
              checked={values.includes(option.id.toString())}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option.id.toString(), !!checked)
              }
            />
            <Label htmlFor={`${idPrefix}-${option.id}`}>{option.name}</Label>
          </div>
        ))}
      </div>
    </BaseFilterBlock>
  );
}

type RadioFilterBlockProps = BaseFilterBlockProps & {
  options: string[];
  idPrefix: string;
  value?: string;
  onChange: (value: string) => void;
};

export function RadioFilterBlock({
  title,
  options,
  idPrefix,
  value,
  onChange,
  scrollable = false,
}: RadioFilterBlockProps) {
  return (
    <BaseFilterBlock title={title} scrollable={scrollable}>
      <RadioGroup value={value} onValueChange={onChange} className="gap-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`${idPrefix}-${option}`} />
            <Label htmlFor={`${idPrefix}-${option}`} className="cursor-pointer">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </BaseFilterBlock>
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
          <SelectTrigger>
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
          <SelectTrigger>
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

export function FilterPanel({
  children,
  onApply,
  onReset,
}: PropsWithChildren<{
  onApply: () => void;
  onReset: () => void;
}>) {
  return (
    <div className="lg:col-span-2 bg-background border rounded-lg p-4 shadow-sm">
      <div className="sticky top-0 left-0">
        <div className="space-y-3">{children}</div>
        <div className="flex flex-col xl:flex-row gap-2 mt-4">
          <Button variant="outline" className="flex-1" onClick={onReset}>
            Сбросить
          </Button>
          <Button className="flex-1" onClick={onApply}>
            Применить
          </Button>
        </div>
      </div>
    </div>
  );
}
