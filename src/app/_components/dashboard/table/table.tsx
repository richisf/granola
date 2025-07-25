"use client";

import { useState } from "react";
import { ArrowUpDown, MoreHorizontal, Plus } from "lucide-react";
import { companies, type Company } from "./data/entries";
import { Button } from "~/app/_components/ui/button";
import { Badge } from "~/app/_components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/_components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { Checkbox } from "~/app/_components/ui/checkbox";
import { Avatar, AvatarFallback } from "~/app/_components/ui/avatar";

function getIcpFitColor(fit: Company["icpFit"]) {
  switch (fit) {
    case "Excellent":
      return "bg-purple-100 text-purple-800";
    case "Good":
      return "bg-green-100 text-green-800";
    case "Medium":
      return "bg-blue-100 text-blue-800";
    case "Low":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getConnectionStrengthColor(strength: Company["connectionStrength"]) {
  switch (strength) {
    case "Very strong":
      return "text-green-600";
    case "Strong":
      return "text-green-600";
    case "Good":
      return "text-blue-600";
    case "Weak":
      return "text-orange-600";
    default:
      return "text-gray-600";
  }
}

function getConnectionStrengthIcon(strength: Company["connectionStrength"]) {
  switch (strength) {
    case "Very strong":
      return "🟢";
    case "Strong":
      return "🟢";
    case "Good":
      return "🔵";
    case "Weak":
      return "🟠";
    default:
      return "⚪";
  }
}

export function CompaniesTable() {
  const [sortField, setSortField] = useState<keyof Company | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const handleSort = (field: keyof Company) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCompanies = [...companies].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCompanies(companies.map(c => c.id));
    } else {
      setSelectedCompanies([]);
    }
  };

  const handleSelectCompany = (companyId: string, checked: boolean) => {
    if (checked) {
      setSelectedCompanies([...selectedCompanies, companyId]);
    } else {
      setSelectedCompanies(selectedCompanies.filter(id => id !== companyId));
    }
  };

  return (
    <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white border-b">
            <TableRow className="h-12">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedCompanies.length === companies.length}
                  onCheckedChange={handleSelectAll}
                  className="h-4 w-4"
                />
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("name")}
                  className="h-auto p-0 font-medium text-sm"
                >
                  Company
                  <Plus className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("domain")}
                  className="h-auto p-0 font-medium text-sm"
                >
                  Domains
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-0 font-medium text-sm"
                >
                  Associated deals
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("icpFit")}
                  className="h-auto p-0 font-medium text-sm"
                >
                  ICP Fit
                  <span className="ml-1 text-blue-500 text-xs">AI</span>
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("estimatedARR")}
                  className="h-auto p-0 font-medium text-sm"
                >
                  Estimated ARR
                  <span className="ml-1 text-blue-500 text-xs">AI</span>
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("connectionStrength")}
                  className="h-auto p-0 font-medium text-sm"
                >
                  Connection strength
                </Button>
              </TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCompanies.map((company) => (
              <TableRow key={company.id} className="h-14">
                <TableCell>
                  <Checkbox
                    checked={selectedCompanies.includes(company.id)}
                    onCheckedChange={(checked) => 
                      handleSelectCompany(company.id, checked as boolean)
                    }
                    className="h-4 w-4"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-sm bg-gray-100 text-gray-700">
                        {company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{company.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal text-xs">
                    {company.domain}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {company.associatedDeals.map((deal, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {deal}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getIcpFitColor(company.icpFit)} text-xs`}>
                    {company.icpFit}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-sm">
                  {company.estimatedARR}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{getConnectionStrengthIcon(company.connectionStrength)}</span>
                    <span className={`${getConnectionStrengthColor(company.connectionStrength)} text-sm`}>
                      {company.connectionStrength}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit company</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Add to list</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete company
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  );
}
