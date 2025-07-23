"use server";
import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";

/**
 * Holt spezifischen Content eines Vereins anhand der Content-ID.
 * Die Verein-ID wird aus dem Cookie gelesen und als Filter genutzt.
 *
 * @param {string|number} id - Die ID des Contents, der geladen werden soll.
 * @returns {Promise<{data?: object[], error?: string}>} Enthält die Content-Daten oder eine Fehlermeldung.
 */
export async function getSpecificContentAction(id) {
  const cookieStore = await cookies();
  const vereinId = cookieStore.get("verein_id")?.value;
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
  return { data };
}

/**
 * Aktualisiert vorhandenen Vereinscontent.
 * Die Verein-ID wird aus dem Cookie ermittelt und dient als Filter.
 *
 * @param {object} formData - Die neuen Content-Daten (z.B. JSON oder Text).
 * @param {string} template - Das Template, das für den Content verwendet wird.
 * @param {string|number} contentID - Die ID des zu aktualisierenden Contents.
 * @param {string} author - Der Autor des Contents.
 * @param {string[]} tags - Tags zum Content.
 * @param {string} title - Titel des Contents.
 * @returns {Promise<{res?: string, error?: string}>} Erfolgsmeldung oder Fehler.
 */
export async function updateContent(
  formData,
  template,
  contentID,
  author,
  tags,
  title
) {
  const cookieStore = await cookies();
  const vereinId = cookieStore.get("verein_id")?.value;

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
  return { res };
}

/**
 * Erstellt neuen Vereinscontent und speichert ihn in der Datenbank.
 * Die Verein-ID wird aus dem Cookie ermittelt und dem Content zugeordnet.
 *
 * @param {object} formData - Der Content, der gespeichert werden soll.
 * @param {string} template - Das Template, das verwendet wird.
 * @param {string} author - Autor des Contents.
 * @param {string[]} tags - Tags zum Content.
 * @param {string} title - Titel des Contents.
 * @returns {Promise<{data?: object, error?: string}>} Enthält den neuen Datensatz oder Fehler.
 */
export async function createContent(formData, template, author, tags, title) {
  const cookieStore = await cookies();
  const vereinId = cookieStore.get("verein_id")?.value;

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
        tags: tags || "[]",
        title: title || "",
      },
    ])
    .select("id");

  if (error) {
    console.error("Fehler beim Erstellen des Contents:", error);
    return { error: "Fehler beim Erstellen" };
  }

  return { data };
}

/**
 * Lädt alle Content-Einträge des Vereins aus der Datenbank.
 * Die Verein-ID wird aus dem Cookie ermittelt.
 *
 * @returns {Promise<{data?: object[], error?: string}>} Alle Content-Datensätze oder Fehler.
 */
export async function loadAllContent() {
  const cookieStore = await cookies();
  const vereinId = cookieStore.get("verein_id")?.value;

  if (!vereinId) {
    console.error("Keine Verein-ID im Cookie gefunden.");
    return { error: "Nicht autorisiert" };
  }

  const { data, error } = await supabase
    .from("Content")
    .select("*")
    .eq("verein_id", vereinId);

  if (error) {
    console.error("Fehler beim Laden des Contents:", error);
    return { error: "Fehler beim Laden" };
  }

  return { data };
}
