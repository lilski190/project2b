"use server";

import { supabase } from "@/lib/supabaseClient";
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

  let LoginData = await getLoginData(verein, email);
  console.log("LOGIN GELADEN :: LoginData:", LoginData);
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

    console.log("Login-Daten erfolgreich abgerufen, jetzt redirect:)");

    redirect("/dashboard");
  }
}

export async function logoutAction() {
  await supabase.auth.signOut();
  redirect("/");
}

export async function getLoginData(vereinName) {
  const cookieStore = await cookies();
  console.log("GET LOGIN DATA!!!");

  // 1. Member des eingeloggten Users abrufen
  const { data: member, error: memberError } = await supabase
    .from("Member")
    .select("*")
    .maybeSingle();

  if (memberError || !member) {
    console.error("Fehler beim Abrufen des Members:", memberError);
    return { error: "Mitglied nicht gefunden." };
  }

  console.log("Gefundener Member:", member);

  // 2. Prüfen, ob eine Verein-ID vorhanden ist
  if (!member.verein_id) {
    console.error("Verein-ID fehlt im Member-Datensatz.");
    return { error: "Verein nicht zugeordnet." };
  }

  // 3. Verein abrufen (nur wenn Member erfolgreich geladen wurde)
  const { data: verein, error: vereinError } = await supabase
    .from("Verein")
    .select("id, name, tags")
    .eq("id", member.verein_id)
    .single();

  if (vereinError || !verein) {
    console.error("Fehler beim Abrufen des Vereins:", vereinError);
    return { error: "Verein nicht gefunden." };
  }

  // 4. Vereinsnamen prüfen
  if (verein.name !== vereinName) {
    console.warn("Eingegebener Vereinsname stimmt nicht überein.");
    return { error: "Falscher Vereinsname." };
  }

  console.log("Verein und Member erfolgreich abgerufen:", verein, member);

  // 5. Erfolgreich → Rückgabe
  return {
    verein_id: verein.id,
    member_id: member.id,
    verein_name: verein.name,
    member_name: member.name,
    verein_tags: verein.tags || [],
  };
}
