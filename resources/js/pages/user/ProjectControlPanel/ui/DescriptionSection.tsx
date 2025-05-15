import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Textarea } from "@/shared/ui/Textarea";

export function DescriptionSection({ description }: { description: string | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Описание проекта</CardTitle>
        <CardDescription>
          Описание является публичной аннотацией к вашему проекту
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={description ?? ""}
          placeholder="Введите описание проекта..."
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button size="sm">Сохранить</Button>
      </CardFooter>
    </Card>
  );
}
