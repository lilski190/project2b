"use server";

import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Login-Action für die Benutzerauthentifizierung.
 *
 * Diese Funktion wird serverseitig aufgerufen, wenn sich ein Benutzer anmeldet.
 * Sie prüft die Anmeldedaten mittels Supabase und setzt bei Erfolg mehrere
 * Cookies mit Sitzungs- und Benutzerinformationen.
 * Anschließend wird der Benutzer zum Dashboard weitergeleitet.
 *
 * @param {FormData} formData - Formulardaten mit den Feldern "email", "password" und "verein".
 * @returns {Promise<object|undefined>} Gibt ein Fehlerobjekt zurück, falls ein Fehler auftritt.
 */
export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const verein = formData.get("verein");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { error: error.message };
  }

  const cookieStore = await cookies();
  const projectRef =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.split("https://")[1]?.split(".")[0];

  const sessionCookieValue = JSON.stringify({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + data.session.expires_in,
    token_type: "bearer",
    provider_token: null,
    provider_refresh_token: null,
    user: data.session.user ?? null,
  });

  cookieStore.set(`sb-${projectRef}-auth-token`, sessionCookieValue, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: data.session.expires_in,
    sameSite: "lax",
  });

  let LoginData = await getLoginData(verein, email);
  if (LoginData.error) {
    console.error("Fehler beim Abrufen der Login-Daten:", LoginData.error);
    return { error: LoginData.error };
  } else if (LoginData.verein_id && LoginData.member_id) {
    cookieStore.set("verein_id", LoginData.verein_id, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    cookieStore.set("verein_name", LoginData.verein_name, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    cookieStore.set("member_id", LoginData.member_id, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    cookieStore.set("member_name", LoginData.member_name, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    cookieStore.set("verein_tags", JSON.stringify(LoginData.verein_tags), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    redirect("/dashboard");
  }
}

/**
 * Logout-Action für die Benutzerauthentifizierung.
 *
 * Diese Funktion meldet den Benutzer bei Supabase ab und löscht
 * alle relevanten Session-Cookies, um die Sitzung zu beenden.
 *
 * @returns {Promise<void>}
 */
export async function logoutAction() {
  await supabase.auth.signOut();
  const cookieStore = await cookies();

  const projectRef =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.split("https://")[1]?.split(".")[0];

  const cookieNames = [
    `sb-${projectRef}-auth-token`,
    "verein_id",
    "verein_name",
    "member_id",
    "member_name",
    "verein_tags",
  ];

  for (const name of cookieNames) {
    cookieStore.set(name, "", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 0,
    });
  }
}

/**
 * Hilfsfunktion zum Laden erweiterter Login-Daten.
 *
 * Lädt die Member- und Vereinsdaten aus der Datenbank und prüft,
 * ob die eingegebenen Daten vollständig und korrekt sind.
 * Stellt sicher, dass der angegebene Vereinsname mit dem Datenbankeintrag übereinstimmt.
 *
 * @param {string} vereinName - Der eingegebene Vereinsname aus dem Login-Formular.
 * @param {string} email - Die E-Mail-Adresse des Benutzers (optional für Erweiterungen).
 * @returns {Promise<object>} Objekt mit Vereins- und Member-Daten oder einem Fehlerfeld.
 */
export async function getLoginData(vereinName) {
  const cookieStore = await cookies();

  const { data: member, error: memberError } = await supabase
    .from("Member")
    .select("*")
    .maybeSingle();

  if (memberError || !member) {
    console.error("Fehler beim Abrufen des Members:", memberError);
    return { error: "Mitglied nicht gefunden." };
  }

  if (!member.verein_id) {
    console.error("Verein-ID fehlt im Member-Datensatz.");
    return { error: "Verein nicht zugeordnet." };
  }

  const { data: verein, error: vereinError } = await supabase
    .from("Verein")
    .select("id, name, tags")
    .eq("id", member.verein_id)
    .single();

  if (vereinError || !verein) {
    console.error("Fehler beim Abrufen des Vereins:", vereinError);
    return { error: "Verein nicht gefunden." };
  }

  if (verein.name !== vereinName) {
    console.warn("Eingegebener Vereinsname stimmt nicht überein.");
    return { error: "Falscher Vereinsname." };
  }

  return {
    verein_id: verein.id,
    member_id: member.id,
    verein_name: verein.name,
    member_name: member.name,
    verein_tags: verein.tags || [],
  };
}
