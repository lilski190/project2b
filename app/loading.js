/**
 * Loading.js
 * Loading-Komponente für die Anwendung.
 * Diese Komponente wird angezeigt, während die Anwendung lädt.
 * Die Komponente kommt von einem Default Setup Projekt das ich für Next.js Projektes mit Supabase aufgesetzt habe.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">⏳ Wird geladen... CUSOMIZE </p>
    </div>
  );
}
