import { ScrollArea } from "@/components/ui/scroll-area";
import { Feedback } from "@/types";
import FeedbackList from "./feedbackList";

interface FeedbackListProps {
  feedbacks: Feedback[];
}
export default async function EventPage() {
  const data = await fetch("http://localhost:3000/api/feedback", {
    cache: "no-cache",
  });
  const feedbacks: Feedback[] = await data.json();
  return (
    <ScrollArea className="h-full">
      <FeedbackList feedbacks={feedbacks} />
    </ScrollArea>
  );
}
