"use client";
import { Feedback } from "@/types";
import FeedbackCard from "./feedbackCard"; // Ajuste o caminho conforme necessário
import deleteFeedbackAction from "./actions/deleteFeedback";

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackList = ({ feedbacks }: FeedbackListProps) => {
  return (
    <div className="flex flex-row gap-6">
      {feedbacks.map((feedback) => {
        const deleteAction = () => {
          deleteFeedbackAction(feedback.id);
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
