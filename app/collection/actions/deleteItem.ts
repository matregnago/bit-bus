"use server";

import { revalidatePath } from "next/cache";

export default async function deleteItem(itemId: string) {
  const request = {
    id: itemId,
  };
  try {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/items`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/collection");
  revalidatePath("/donation");
}
