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
  return (
    <div className="flex flex-row gap-6">
      {feedbacks.map((feedback) => {
        const deleteAction = () => {
          deleteFeedbackAction(feedback.id);
          router.refresh();
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
