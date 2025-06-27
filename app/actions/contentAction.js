"use server";
import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";

/**
 * Get-Action für den Styleguide für den Verein.
 * Aktuell mit Dummy-Daten.

 */
export async function getSpecificContentAction(id) {
  console.log("Daten für den einen Content laden!");
  const cookieStore = await cookies();
  const vereinId = cookieStore.get("verein_id")?.value;
  console.log("Verein ID aus Cookie:", vereinId);
  if (!vereinId) {
    console.error("Keine Verein-ID im Cookie gefunden.");
    return { error: "Nicht autorisiert" };
  }

  const { data, error } = await supabase
    .from("Content")
    .select("content, author, tags, title")
    .eq("verein_id", vereinId)
    .eq("id", id);

  if (error || !data) {
    console.error("Fehler beim Laden des Conetns:", error);
    return { error: "Kein content gefunden." };
  }
  console.log("Contnetn geladen:", data);

  return { data };
}

export async function updateContent(
  formData,
  template,
  contentID,
  author,
  tags,
  title
) {
  console.log("Daten für den Content updaten!", formData);
  const cookieStore = await cookies();
  const vereinId = cookieStore.get("verein_id")?.value;
  console.log("Verein ID aus Cookie:", vereinId);

  if (!vereinId) {
    console.error("Keine Verein-ID im Cookie gefunden.");
    return { error: "Nicht autorisiert" };
  }

  const { data, error } = await supabase
    .from("Content")
    .update({
      template: template,
      content: formData,
      last_update: new Date().toISOString(),
      author: author,
      tags: tags,
      title: title,
    })
    .eq("verein_id", vereinId)
    .eq("id", contentID);

  if (error) {
    console.error("Fehler beim Speichern des Contents:", error);
    return { error: "Fehler beim Speichern" };
  }

  let res = "success";
  console.log("Content erfolgreich gespeichert!");
  return { res };
}

export async function createContent(formData, template, author, tags, title) {
  console.log("Neuen Content erstellen!", formData);
  const cookieStore = await cookies();
  const vereinId = cookieStore.get("verein_id")?.value;
  console.log("Verein ID aus Cookie:", vereinId);

  if (!vereinId) {
    console.error("Keine Verein-ID im Cookie gefunden.");
    return { error: "Nicht autorisiert" };
  }

  const { data, error } = await supabase
    .from("Content")
    .insert([
      {
        template: template,
        content: formData,
        verein_id: vereinId,
        create_at: new Date().toISOString(),
        last_update: new Date().toISOString(),
        author: author || "[]",
        tags: tags || "[]", // sicherstellen, dass tags ein Array ist
        title: title || "",
      },
    ])
    .select("id");

  if (error) {
    console.error("Fehler beim Erstellen des Contents:", error);
    return { error: "Fehler beim Erstellen" };
  }

  console.log("Content erfolgreich erstellt!", data);
  return { data };
}

export async function loadAllContent() {
  const cookieStore = await cookies();
  const vereinId = cookieStore.get("verein_id")?.value;

  if (!vereinId) {
    console.error("Keine Verein-ID im Cookie gefunden.");
    return { error: "Nicht autorisiert" };
  }

  const { data, error } = await supabase
    .from("Content")
    .select("*") // du kannst hier auch gezielt Spalten wählen: "id, template, last_update"
    .eq("verein_id", vereinId); // optional: nur Content für diesen Verein laden

  if (error) {
    console.error("Fehler beim Laden des Contents:", error);
    return { error: "Fehler beim Laden" };
  }

  return { data }; // data ist ein Array mit allen Datensätzen
}
