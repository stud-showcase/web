import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Vacancy } from "@/entities/Vacancy";

export function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle title={vacancy.name}>{vacancy.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Text variant="muted" className={isExpanded ? "" : "line-clamp-2"}>
            {vacancy.description}
          </Text>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Скрыть
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Показать полностью
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
