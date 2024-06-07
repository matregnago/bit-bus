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
      <title key="title">Feedbacks</title>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Feedbacks</h1>
          <Link href="/feedback/create">
            <Button className="text-xs md:text-sm">Criar Feedback</Button>
          </Link>
        </div>
        <FeedbackList feedbacks={feedbacks} />
      </div>
    </ScrollArea>
  );
}
