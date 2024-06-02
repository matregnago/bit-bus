"use client";

import { Visita } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsVisitTable: ColumnDef<Visita>[] = [
  {
    accessorKey: "dataHora",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data e hora" />
    ),
  },
  {
    accessorKey: "local.cidade",
    id: "cidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cidade" />
    ),
  },
  {
    id: "acoes",
    cell: ({ row }) => {
      const item = row.original;
      const IconEdit = Icons["edit"];
      const IconDelete = Icons["delete"];
      const IconDetails = Icons["details"];
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id)}
            >
              Copiar id do item
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconDetails className="mr-2 h-4 w-4" /> Detalhes
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconEdit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconDelete className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
