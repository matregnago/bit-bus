"use server";

import { revalidatePath } from "next/cache";

export default async function deleteWorkshopAction(visitaId: string) {
  const request = {
    id: visitaId,
  };
  try {
    fetch("http://localhost:3000/api/events/workshop", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/events");
}
