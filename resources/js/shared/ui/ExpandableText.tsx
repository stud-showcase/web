import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Text } from "@/shared/ui/Text";

type ExpandableTextProps = {
  text: string;
  maxLength?: number;
  className?: string;
}

export function ExpandableText({
  text,
  maxLength = 100,
  className = "",
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldTruncate = text.length > maxLength;
  const displayText = shouldTruncate && !isExpanded
    ? `${text.substring(0, maxLength)}...`
    : text;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Text variant="small">{displayText}</Text>

      {shouldTruncate && (
        <button
          onClick={toggleExpand}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group w-fit"
        >
          {isExpanded ? (
            <>
              <span>Свернуть</span>
              <ChevronUp className="h-4 w-4 transition-transform group-hover:scale-110" />
            </>
          ) : (
            <>
              <span>Раскрыть</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:scale-110" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
