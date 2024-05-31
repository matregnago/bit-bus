import { Item } from "@/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { ScrollArea } from "@/components/ui/scroll-area";

const getItems = async (): Promise<Item[]> => {
  "use server";
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

export default async function DemoPage() {
  const data: Item[] = await getItems();

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </ScrollArea>
  );
}
