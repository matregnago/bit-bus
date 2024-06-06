import { ScrollArea } from "@/components/ui/scroll-area";
import { Feedback } from "@/types";
import FeedbackList from "./feedbackList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      <h1 className="text-3xl font-bold mb-5">Feedbacks</h1>
      <Link className="" href="/feedback/create">
        <Button>Criar Feedback</Button>
      </Link>
      <FeedbackList feedbacks={feedbacks} />
    </ScrollArea>
  );
}
