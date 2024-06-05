import { ScrollArea } from "@/components/ui/scroll-area";
import EventForm from "./eventform";

export default function Home() {
  return (
    <ScrollArea className="h-full">
      <EventForm />
    </ScrollArea>
  );
}
