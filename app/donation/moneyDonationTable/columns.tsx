"use client";

import { DoacaoDinheiro } from "@/types";
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
import { CellAction } from "./cell-action";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsMoneyDonationTable: ColumnDef<DoacaoDinheiro>[] = [
  {
    accessorKey: "doador.nome",
    id: "doador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome doador" />
    ),
  },
  {
    accessorKey: "doador.email",
    id: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email doador" />
    ),
  },
  {
    accessorKey: "quantiaDinheiro",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantia" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 truncate">
          {Number(row.getValue("quantiaDinheiro")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
      );
    },
  },
  {
    id: "acoes",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
