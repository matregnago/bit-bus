"use client";

import { Oficina } from "@/types";
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
import Link from "next/link";
import { CellAction } from "./cell-action";
import { dateFormatter } from "@/lib/dateformatter";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsWorkshopTable: ColumnDef<Oficina>[] = [
  {
    accessorKey: "titulo",
    id: "titulo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titulo" />
    ),
  },
  {
    accessorKey: "dataHora",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data e hora" />
    ),
    cell: ({ row }) => {
      const { dia, hora } = dateFormatter(row.getValue("dataHora"));

      return (
        <div className="flex w-[100px] items-center">
          <span>{`${dia} ${hora}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "duracao",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duracao" />
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
