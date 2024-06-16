"use server";

import { revalidatePath } from "next/cache";

export default async function deleteItemDonation(donationId: string) {
  const request = {
    id: donationId,
  };
  try {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/donation/itemdonation`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/donation");
}
