"use server";

import { createSupabaseServerClient } from "@/lib/createSupabaseServerClient";

/**
 * Get-Action für den aktuellen Benutzer.
 * Diese Funktion wird aufgerufen, um die Informationen des aktuell angemeldeten Benutzers abzurufen.
 * Sie verwendet Supabase, um die Benutzerdaten zu laden.
 * @returns {object|null} - Gibt die Benutzerdaten zurück, wenn der Benutzer angemeldet ist, andernfalls null.
 * @throws {Error} - Wenn ein Fehler beim Laden der Benutzerdaten auftritt.
 */
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
