"use client";
import { Feedback } from "@/types";
import FeedbackCard from "./feedbackCard"; // Ajuste o caminho conforme necessário
import deleteFeedbackAction from "./actions/deleteFeedback";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackList = ({ feedbacks }: FeedbackListProps) => {
  const { toast } = useToast();
  const router = useRouter();
  return feedbacks.length === 0 ? (
    <p>Não há feedbacks registrados</p>
  ) : (
    <div className="grid gap-10 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {feedbacks.map((feedback) => {
        const deleteAction = async () => {
          if (feedback.id !== undefined) {
            try {
              await deleteFeedbackAction(feedback.id);
              router.refresh();
              toast({
                title: "Sucesso!",
                description: "O feedback foi removido com sucesso!",
              });
            } catch (error) {
              toast({
                title: "Erro!",
                description: `Erro ao excluir visita: ${error}!`,
              });
            }
          }
        };
        return (
          <FeedbackCard
            key={feedback.id}
            onDelete={deleteAction}
            feedback={feedback}
          />
        );
      })}
    </div>
  );
};

export default FeedbackList;
