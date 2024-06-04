import * as React from "react";
import FilteredItems from "./cards/itemsCards";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DoacaoItem, Item } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

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
    <ScrollArea className="h-full">
      <h1 className="text-black text-3xl font-bold">Acervo</h1>
      <div>
        <Tabs defaultValue="tabela" className="">
          <TabsList>
            <TabsTrigger value="tabela">Tabela</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
          </TabsList>
          <TabsContent value="tabela">
            <div className="container mx-auto">
              <DataTable columns={columns} data={data} />
            </div>
          </TabsContent>
          <TabsContent value="cards">
            <section className="py-10">
              <div className="text-center">
                <FilteredItems items={items} />
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
