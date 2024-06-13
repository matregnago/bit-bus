"use client";

import { Item } from "@/types";
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
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "nome",
    id: "nome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: "ano",
    id: "ano",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ano" />
    ),
  },
  {
    accessorKey: "quantidade",
    id: "quantidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantidade" />
    ),
  },
  {
    accessorKey: "tipo",
    id: "tipo",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
  },
  {
    id: "acoes",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
