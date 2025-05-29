"use server";
import styleguideDummidata from "@/dummidaten/styleguide.JSON";
/**
 * Get-Action für den Styleguide für den Verein.
 * Aktuell mit Dummy-Daten.

 */
export async function getStyleguideAction() {
  //console.log("Dummy Daten für den Styleguide geladen", styleguideDummidata);
  //TODO: IDS aus Styleguide entfernen!!!
  return JSON.stringify(styleguideDummidata);

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

export async function saveStyleguideAction(formData) {
  //  console.log("Dummy Daten für den Styleguide speichern", formData);
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
