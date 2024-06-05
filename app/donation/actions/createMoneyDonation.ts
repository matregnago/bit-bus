"use server";
import { DoacaoDinheiro } from "@/types";

export default async function createItemDonation(request: DoacaoDinheiro) {
  const req = await fetch("http://localhost:3000/api/donation/moneydonation", {
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
