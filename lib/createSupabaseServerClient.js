"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * Supabase Server funktion
 * Diese Funktion erstellt einen Supabase-Client, der auf dem Server verwendet werden kann.
 * Sie verwendet die Supabase Auth-Helpers-Bibliothek, um den Client zu erstellen.
 * Setzt die Cookies des Clients auf die Cookies des aktuellen Requests.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });
  return supabase;
}
