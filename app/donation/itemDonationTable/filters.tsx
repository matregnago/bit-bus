"use client";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Icons } from "@/components/icons";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { tiposItem } from "@/constants/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const ResetIcon = Icons["reset"];
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter nome..."
          value={
            (table.getColumn("itemNome")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("itemNome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {table.getColumn("itemTipo") && (
          <DataTableFacetedFilter
            column={table.getColumn("itemTipo")}
            title="Tipo"
            options={tiposItem}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <ResetIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
