import { ScrollArea } from "@/components/ui/scroll-area";
import { Feedback } from "@/types";
import FeedbackList from "./feedbackList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

interface FeedbackListProps {
  feedbacks: Feedback[];
}
export default async function EventPage() {
  let feedbacks: Feedback[];
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/feedback`, {
      cache: "no-store",
    });
    feedbacks = await data.json();
  } catch (error) {
    feedbacks = [];
  }
  return (
    <ScrollArea className="h-full">
      <title key="title">Feedbacks</title>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Feedbacks</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie os feedbacks dos visitantes.
            </p>
          </div>
          <Link href="/feedback/create">
            <Button className="text-xs md:text-sm">
              <Plus className="mr-2 h-4 w-4" /> Criar Feedback
            </Button>
          </Link>
        </div>
        <Separator />
        <FeedbackList feedbacks={feedbacks} />
      </div>
    </ScrollArea>
  );
}
