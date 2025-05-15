import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";

export function NameSection({ name }: { name: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Название проекта</CardTitle>
        <CardDescription>
          Является публичным именем вашего проекта
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          value={name}
          placeholder="Введите название проекта..."
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button size="sm">Сохранить</Button>
      </CardFooter>
    </Card>
  );
}
