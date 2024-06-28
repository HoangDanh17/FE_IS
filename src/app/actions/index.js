"use server";
import { signIn } from "../auth";

export async function loginGoogle(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/login" });
}
