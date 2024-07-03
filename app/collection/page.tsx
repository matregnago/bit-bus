import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DoacaoItem, Item } from "@/types";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

const getItems = async (): Promise<Item[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/items`, {
      cache: "no-store",
    });
    const itens: Item[] = await res.json();
    return itens;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function ShowcaseItems() {
  const data: Item[] = await getItems();
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <title key="title">Acervo</title>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Acervo</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie os itens do acervo do museu.
            </p>
          </div>
          <Link href="/collection/create">
            <Button className="text-xs md:text-sm">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Item
            </Button>
          </Link>
        </div>
        <Separator />
        <DataTable columns={columns} data={data} />
      </div>
    </ScrollArea>
  );
}
