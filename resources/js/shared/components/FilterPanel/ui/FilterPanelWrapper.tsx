import { Button } from "@/shared/ui/Button";
import { ReactNode } from "react";

export function FilterPanelWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="lg:col-span-1 bg-white border rounded-lg px-4 pb-4">
      <div className="sticky top-0 left-0">
        {children}
        <div className="flex flex-col xl:flex-row gap-2 mt-4">
          <Button variant="outline" className="w-full">
            Сбросить
          </Button>
          <Button className="w-full">Применить</Button>
        </div>
      </div>
    </div>
  );
}
