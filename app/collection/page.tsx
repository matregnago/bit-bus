import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DoacaoItem, Item } from "@/types";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { Button } from "@/components/ui/button";

const getItems = async (): Promise<DoacaoItem[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/donation/itemdonation", {
      cache: "no-cache",
    });
    const { doacoesItem }: { doacoesItem: DoacaoItem[] } = await res.json();
    console.log(doacoesItem);
    return doacoesItem;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function ShowcaseItems() {
  const data: DoacaoItem[] = await getItems();
  const items: Item[] = [];
  data.map((doacaoItem) => {
    items.push(doacaoItem.item);
  });
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <ScrollArea className="h-full">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Acervo</h1>
          <Button className="text-xs md:text-sm">Adicionar Item</Button>
        </div>
        <DataTable columns={columns} data={data} />
      </ScrollArea>
    </div>
  );
}
