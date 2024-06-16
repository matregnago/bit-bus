"use server";
import { Visita } from "@/types";

export default async function createVisit(request: Visita) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/events/visitation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  if (req.status === 200) {
    return req.json();
  } else {
    throw new Error(`${req.status}`);
  }
}
