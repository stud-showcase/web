import { Text } from "@/shared/ui/Text";
import { Checkbox } from "@/shared/ui/Checkbox";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { Separator } from "@/shared/ui/Separator";

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
      <Text className="font-medium pt-4 pb-3">{title}</Text>
      {scrollable ? (
        <ScrollArea className="h-40 w-full">{content}</ScrollArea>
      ) : (
        content
      )}
      <div className="pt-3">
        <Separator />
      </div>
    </div>
  );
}
