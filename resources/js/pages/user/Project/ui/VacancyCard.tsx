import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Vacancy } from "@/entities/Vacancy";
import { ExpandableText } from "@/shared/ui/ExpandableText";

export function VacancyCard({ vacancy }: { vacancy: Vacancy }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle title={vacancy.name}>{vacancy.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ExpandableText text={vacancy.description} maxLength={100} />
      </CardContent>
    </Card>
  );
}
