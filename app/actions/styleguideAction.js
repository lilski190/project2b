"use server";
import styleguideDummidata from "@/dummidaten/styleguide.JSON";
import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";

/**
 * Get-Action für den Styleguide für den Verein.
 * Aktuell mit Dummy-Daten.

 */
export async function getStyleguideAction() {
  console.log("Daten für den Styleguide laden!");
  const cookieStore = await cookies();
  const vereinId = cookieStore.get("verein_id")?.value;
  console.log("Verein ID aus Cookie:", vereinId);
  if (!vereinId) {
    console.error("Keine Verein-ID im Cookie gefunden.");
    return { error: "Nicht autorisiert" };
  }

  const { data: styleguide, error } = await supabase
    .from("Styleguide")
    .select("colors, backgrounds, logo, fonts, slogan, grafics")
    .eq("verein_id", vereinId);

  if (error || !styleguide) {
    console.error("Fehler beim Laden des Styleguides:", error);
    return { error: "Kein Styleguide gefunden." };
  }
  console.log("Styleguide geladen:", styleguide);

  let stringify = JSON.stringify(styleguide);
  return { stringify };
}

export async function saveStyleguideAction(formData) {
  console.log("Daten für den Styleguide speichern!", formData);
  // console.log("Dummy Daten für den Styleguide speichern", formData);
  //TODO: Speicher action implementieren
  // const supabase = await createSupabaseServerClient();
  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.getUser();
  // if (error) {
  //   console.error("Fehler beim Laden des Users:", error.message);
  // }
  // return user;
}
