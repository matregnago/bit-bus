"use server";

import { revalidatePath } from "next/cache";

export default async function deleteMoneyDonation(donationId: string) {
  const request = {
    id: donationId,
  };
  try {
    fetch("http://localhost:3000/api/donation/moneydonation", {
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
