import { Button } from "@/shared/ui/Button";
import { ReactNode } from "react";

export function FilterPanelWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="lg:col-span-1 bg-white border shadow-sm rounded-lg px-6 pb-4">
      <div className="sticky top-0 left-0 space-y-4">
        {children}
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            Сбросить
          </Button>
          <Button className="w-full">Применить</Button>
        </div>
      </div>
    </div>
  );
}
