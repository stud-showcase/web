import { Text } from "@/shared/ui/Text";
import { Separator } from "@/shared/ui/Separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/Select";

type RangeFilterBlockProps = {
  title: string;
  range: number[];
};

export function RangeFilterBlock({ title, range }: RangeFilterBlockProps) {
  return (
    <div>
      <Text className="font-medium pt-4 pb-3">{title}</Text>
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
