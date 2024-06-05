"use server";
import { Visita } from "@/types";

export default async function createVisit(request: Visita) {
  const req = await fetch("http://localhost:3000/api/events/visitation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (req.status === 200) {
    return req.json();
  } else {
    throw new Error(`${req.status}`);
  }
}
