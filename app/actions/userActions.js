"use server";

import { createSupabaseServerClient } from "@/lib/createSupabaseServerClient";

export async function getUserAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Fehler beim Laden des Users:", error.message);
  }

  return user;
}
