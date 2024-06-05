"use server";
import { Feedback } from "@/types";

export default async function createFeedback(request: Feedback) {
  const req = await fetch("http://localhost:3000/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (req.status === 200 || req.status === 401) {
    return req.status;
  } else {
    throw new Error(`${req.status}`);
  }
}
