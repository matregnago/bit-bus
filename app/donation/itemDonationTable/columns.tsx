"use client";

import { DoacaoItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { CellAction } from "./cell-action";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsItemDonationTable: ColumnDef<DoacaoItem>[] = [
  {
    accessorKey: "doador.nome",
    id: "doador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome do doador" />
    ),
  },
  {
    accessorKey: "item.nome",
    id: "itemNome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome do item" />
    ),
  },
  {
    accessorKey: "item.ano",
    id: "itemAno",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ano" />
    ),
  },
  {
    accessorKey: "item.quantidade",
    id: "itemQuantidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantidade" />
    ),
  },
  {
    accessorKey: "item.tipo",
    id: "itemTipo",
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
