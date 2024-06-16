"use server";

import { revalidatePath } from "next/cache";

export default async function deleteVisitAction(visitaId: string) {
  const request = {
    id: visitaId,
  };
  try {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/events/visitation`, {
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
