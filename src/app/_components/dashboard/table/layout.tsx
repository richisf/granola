"use client";

import { CompaniesTable } from "./table";
import { TableHeader } from "./header";

export function TableLayout() {
  return (
    <div className="h-full flex flex-col">
      <TableHeader />
      <CompaniesTable />
    </div>
  );
}
