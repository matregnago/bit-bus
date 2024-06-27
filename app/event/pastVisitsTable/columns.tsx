"use client";

import { Visita } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

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
import { CellAction } from "./cell-action";
import { dateFormatter } from "@/lib/dateformatter";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsVisitTable: ColumnDef<Visita>[] = [
  {
    accessorKey: "dataHora",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data e hora" />
    ),
    cell: ({ row }) => {
      const { dia, hora } = dateFormatter(row.getValue("dataHora"));

      return (
        <div className="flex w-[100px] text-center">
          <span>{`${dia} ${hora}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "local.cidade",
    id: "cidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cidade" />
    ),
  },
  {
    accessorKey: "local.bairro",
    id: "bairro",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bairro" />
    ),
  },
  {
    accessorKey: "organizador.nome",
    id: "organizador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organizador" />
    ),
  },
  {
    id: "acoes",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
