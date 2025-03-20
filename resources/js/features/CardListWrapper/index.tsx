import { ReactNode } from "react";
import { Pagination } from "./ui/Pagination";

export function CardListWrapper({children}: {children: ReactNode}) {
  return (
    <div className="lg:col-span-3">
      <div className="grid grid-cols-1 gap-6">
        {children}
      </div>
      <Pagination />
    </div>
  );
}
