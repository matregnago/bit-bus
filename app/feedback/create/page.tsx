import { ScrollArea } from "@/components/ui/scroll-area";
import FeedackForm from "./feedbackForm";

export default function Home() {
  return (
    <ScrollArea className="h-full">
      <FeedackForm />
    </ScrollArea>
  );
}
