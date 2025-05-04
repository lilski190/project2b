"use server";

import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

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
  redirect("/trapper/list");
}

export async function logoutAction() {
  const { createSupabaseServerClient } = await import(
    "@/lib/createSupabaseServerClient"
  );
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();
  redirect("/");
}
