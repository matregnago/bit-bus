"use server";

import { revalidatePath } from "next/cache";

export default async function deleteFeedbackAction(feedbackId: string) {
  const request = {
    id: feedbackId,
  };
  try {
    fetch("http://localhost:3000/api/feedback", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/feedback");
}
