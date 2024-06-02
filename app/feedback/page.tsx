import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Feedback } from "@/types";
import { Button } from "@/components/ui/button";

interface FeedbackCardProps {
  feedback: Feedback;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackCard = ({ feedback }: FeedbackCardProps) => (
  <Card className="min-w-80">
    <CardHeader>
      <CardTitle>{feedback.visitante.nome}</CardTitle>
      <CardDescription>{feedback.conteudo}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Nota: {feedback.nota}</p>
      <Button>Ver detalhes</Button>
    </CardContent>
  </Card>
);

const FeddbackList = ({ feedbacks }: FeedbackListProps) => {
  return (
    <div className="flex flex-row gap-6">
      {feedbacks.map((feedback) => {
        return <FeedbackCard key={feedback.id} feedback={feedback} />;
      })}
    </div>
  );
};

export default async function EventPage() {
  const data = await fetch("http://localhost:3000/api/feedback", {
    cache: "no-cache",
  });
  const feedbacks: Feedback[] = await data.json();
  return (
    <ScrollArea className="h-full">
      <FeddbackList feedbacks={feedbacks} />
    </ScrollArea>
  );
}
