import { Switch } from "@/shared/ui/Switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";

export function HiringSection({ isHiring }: { isHiring: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Набор в проектную команду</CardTitle>
        <CardDescription>
          {isHiring
            ? "Новые участники могут подавать заявки"
            : "Набор закрыт — заявки не принимаются"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Switch checked={isHiring} />
          <Text variant="muted">
            {isHiring ? "Набор открыт" : "Набор закрыт"}
          </Text>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button size="sm">Сохранить</Button>
      </CardFooter>
    </Card>
  );
}
