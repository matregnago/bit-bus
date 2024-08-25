"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function redirectCollectionPage() {
  revalidatePath("/collection");
  revalidatePath("/");
  redirect("/collection");
}
