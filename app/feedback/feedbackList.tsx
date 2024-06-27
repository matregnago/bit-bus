"use client";
import { Feedback } from "@/types";
import FeedbackCard from "./feedbackCard"; // Ajuste o caminho conforme necessário
import deleteFeedbackAction from "./actions/deleteFeedback";
import { useRouter } from "next/navigation";

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackList = ({ feedbacks }: FeedbackListProps) => {
  const router = useRouter();
  return feedbacks.length === 0 ? (
    <p>Não há feedbacks registrados</p>
  ) : (
    <div className="grid gap-10 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {feedbacks.map((feedback) => {
        const deleteAction = () => {
          if (feedback.id !== undefined) {
            deleteFeedbackAction(feedback.id);
            router.refresh();
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
