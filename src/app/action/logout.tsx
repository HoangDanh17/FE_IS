"use server";
import { cookies } from "next/headers";

export async function deleteThemeCookie() {
  await cookies().delete("token");
}
