"use server";
import { Item } from "@/types";

export default async function creatItem(request: Item) {
  const req = await fetch("http://localhost:3000/api/items", {
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
