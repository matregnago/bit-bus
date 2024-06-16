"use server";
import { DoacaoItem } from "@/types";

export default async function createItemDonation(request: DoacaoItem) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/donation/itemdonation`,
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
