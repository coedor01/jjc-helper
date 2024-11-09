"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setRole(formData: FormData) {
  const rawFormData = {
    server: formData.get("server") as string,
    name: formData.get("name") as string,
  };

  if (rawFormData.server && rawFormData.name) {
    const cookieStore = await cookies();
    cookieStore.set("server", rawFormData.server);
    cookieStore.set("name", rawFormData.name);
  }
  redirect("/");
}
