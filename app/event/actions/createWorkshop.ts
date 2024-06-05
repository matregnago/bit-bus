"use server";
import { Oficina } from "@/types";

export default async function createWorkshop(request: Oficina) {
  const req = await fetch("http://localhost:3000/api/events/workshop", {
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
