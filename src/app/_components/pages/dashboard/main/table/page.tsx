"use client";

import { CompaniesTable } from "./table/page";
import { TableHeader } from "./header/page";

export function Table() {
  return (
    <div className="h-full flex flex-col">
      <TableHeader />
      <CompaniesTable />
    </div>
  );
} 