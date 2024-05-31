import * as React from "react";
import FilteredItems from "./cards/itemsCards";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Item } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "./datatable/columns";
import { DataTable } from "./datatable/data-table";

const getItems = async (): Promise<Item[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/items", {
      cache: "no-cache",
    });
    const items: Item[] = await res.json();
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function ShowcaseItems() {
  const data: Item[] = await getItems();
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
                <FilteredItems items={data} />
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
