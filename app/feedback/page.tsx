import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeedbackCard = ({ feedback }) => (
  <Card className="min-w-80">
    <CardHeader>
      <CardTitle>{feedback.visitante.nome}</CardTitle>
      <CardDescription>{feedback.conteudo}</CardDescription>
    </CardHeader>
    <CardContent>
      <Badge variant="outline">
        Visitado em:{" "}
        {new Date(feedback.visitante.visitas[0].dataHora).toLocaleString()}{" "}
      </Badge>
      <p>Nota: {feedback.nota}</p>
    </CardContent>
  </Card>
);

const FeddbackList = ({ feedbacks }) => {
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
  const feedbacks = await data.json();
  console.log(feedbacks);
  return (
    <div>
      <FeddbackList feedbacks={feedbacks} />
    </div>
  );
}
