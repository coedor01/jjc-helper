"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function setRole(formData: FormData) {
  const rawFormData = {
    server: formData.get("server") as string,
    name: formData.get("name") as string,
  };
  if (!rawFormData?.server || !rawFormData?.name) {
    console.log("需要输入server和name字段");
  }

  const cookieStore = cookies();
  cookieStore.set("server", rawFormData.server, { secure: true });
  cookieStore.set("name", rawFormData.name, { secure: true });

  redirect("/");
}

export { setRole };
