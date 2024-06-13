import { ScrollArea } from "@/components/ui/scroll-area";
import ItemForm from "./itemForm";

export default function Home() {
  return (
    <ScrollArea className="h-full">
      <ItemForm />
    </ScrollArea>
  );
}
