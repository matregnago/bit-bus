"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function redirectFeedbackPage() {
  revalidatePath("/feedback");
  revalidatePath("/");
  redirect("/feedback");
}
