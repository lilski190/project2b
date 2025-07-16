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
  const cookieStore = await cookies();
  const vereinId = cookieStore.get("verein_id")?.value;
  console.log("Verein ID aus Cookie:", vereinId);

  if (!vereinId) {
    console.error("Keine Verein-ID im Cookie gefunden.");
    return { error: "Nicht autorisiert" };
  }

  let data = {
    colors: {
      main_01: formData.get("main_01"),
      main_02: formData.get("main_02"),
      detail_01: formData.get("detail_01"),
      detail_02: formData.get("detail_02"),
      text_01: formData.get("text_01"),
      text_02: formData.get("text_02"),
      neutral_01: formData.get("neutral_01"),
      neutral_02: formData.get("neutral_02"),
    },
    backgrounds: {
      light_01: formData.get("light_01"),
      light_02: formData.get("light_02"),
      dark_01: formData.get("dark_01"),
      dark_02: formData.get("dark_02"),
    },
    logo: {
      big: formData.get("logo_big"),
      small: formData.get("logo_small"),
      one_color: formData.get("logo_one_color"),
    },
    fonts: {
      heading: {
        font_family: formData.get("headline_family"),
      },
      body: {
        font_family: formData.get("text_family"),
      },
    },
    slogan: formData.get("slogan"),
    grafics: {
      form_01: formData.get("form_01"),
      form_02: formData.get("form_02"),
      form_03: formData.get("form_03"),
      form_04: formData.get("form_04"),
      grafik_01: formData.get("grafik_01"),
      grafik_02: formData.get("grafik_02"),
      grafik_03: formData.get("grafik_03"),
      grafik_04: formData.get("grafik_04"),
    },
  };

  console.log("Parsed data:", data);

  const { error } = await supabase
    .from("Styleguide")
    .update({
      colors: data.colors,
      backgrounds: data.backgrounds,
      logo: data.logo,
      fonts: data.fonts,
      slogan: data.slogan,
      grafics: data.grafics,
    })
    .eq("verein_id", vereinId);

  if (error) {
    console.error("Fehler beim Speichern des Styleguides:", error);
    return { error: "Fehler beim Speichern" };
  }

  console.log("Styleguide erfolgreich gespeichert!");
  return { data };
}
