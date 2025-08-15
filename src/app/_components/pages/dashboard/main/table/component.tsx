"use client";

import { CompaniesTable } from "./table/component";
import { TableHeader } from "./header/component";

export function Table() {
  return (
    <div className="h-full flex flex-col">
      <TableHeader />
      <CompaniesTable />
    </div>
  );
} 