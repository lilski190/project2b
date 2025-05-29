"use server";

import { supabase } from "@/lib/supabaseClient";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Login-Action für die Authentifizierung eines Benutzers.
 * Diese Funktion wird aufgerufen, wenn ein Benutzer sich anmelden möchte.
 * Sie verwendet Supabase, um die Anmeldedaten zu überprüfen und ein Authentifizierungstoken zu generieren.
 * Bei erfolgreicher Anmeldung wird ein Cookie mit dem Authentifizierungstoken gesetzt und der Benutzer wird zur Dashboard-Seite weitergeleitet.
 * Bei einem Fehler wird eine Fehlermeldung zurückgegeben.
 * Die funktion kommt von einem Default Setup Projekt das ich für Next.js Projektes mit Supabase aufgesetzt habe.
 * @param {object} formData - Das FormData-Objekt mit den Eingabewerten, beinhaltet email und password.
 */
export async function loginAction(formData) {
  const email = formData.get("email");

  const password = formData.get("password");
  const verein = formData.get("verein");

  //TEST
  getLoginData(verein, email);
  //END TEST
  console.log("Login action triggered for Verein:", verein);

  console.log("Login action triggered with email:", email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("Supabase response:", data, error);

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

  console.log("Cookie set:", cookieStore.get(`sb-${projectRef}-auth-token`));
  console.log("Session data:", data.session);

  //nach erfolgreichem Login wird die getLoginData Funktion aufgerufen
  //TODO: Schauen ob die Daten geladen wurden und passen!
  getLoginData(verein, email);
  redirect("/dashboard");
}

export async function logoutAction() {
  await supabase.auth.signOut();
  redirect("/");
}

export async function getLoginData(vereinName, email) {
  const supabase = await createSupabaseServerClient();
  //Test -> get all members!
  const { data: members } = await supabase.from("member").select("*");

  console.log("Gefundene Member:", members);

  const { data: member, error: memberError } = await supabase
    .from("Member")
    .select("id, verein_id")
    .ilike("email", email)
    .maybeSingle();

  const { data, error } = await supabase
    .from("Member")
    .select("*")
    .maybeSingle();

  console.log("Supabase response for member:", data, error);

  console.log("Gefundener Member:", member);
  if (memberError || !member) {
    console.error("Fehler beim Abrufen des Members:", memberError);
    return { error: "Mitglied nicht gefunden." };
  }

  // 2. Verein holen anhand der ID
  const { data: verein, error: vereinError } = await supabase
    .from("Verein")
    .select("id, name")
    .eq("id", member.verein_id)
    .single();

  if (vereinError || !verein) {
    console.error("Fehler beim Abrufen des Vereins:", vereinError);
    return { error: "Verein nicht gefunden." };
  }

  // 3. Überprüfen, ob der eingegebene Vereinsname passt
  if (verein.name !== vereinName) {
    return { error: "Falscher Vereinsname." };
  }

  console.log("Verein und Member erfolgreich abgerufen:", verein, member);

  //TODO: daten in der Session speichern oder zurückgeben
  //  Erfolg – gib Verein-ID z. B. zurück
  return {
    verein_id: verein.id,
    member_id: member.id,
  };
}
