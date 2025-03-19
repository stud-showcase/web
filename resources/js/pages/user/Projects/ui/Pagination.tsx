import { Button } from "@/shared/ui/Button";

export function Pagination() {
  return (
    <div className="mt-8 flex justify-center space-x-2">
      <Button variant="outline">Назад</Button>
      <Button variant="default">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">3</Button>
      <Button variant="outline">Вперед</Button>
    </div>
  );
}
