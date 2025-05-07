import Link from "next/link";

/**
 * 404-Seite für nicht gefundene Routen in einer Next.js-Anwendung.
 * Diese Seite wird angezeigt, wenn der Benutzer eine Route aufruft, die nicht existiert.
 * Sie enthält eine einfache Nachricht und einen Link zur Startseite.
 * Die Komponente kommt von einem Default Setup Projekt das ich für Next.js Projektes mit Supabase aufgesetzt habe.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Seite nicht gefunden</h1>
      <p className="mt-4">Die angeforderte Seite existiert nicht. CUSTOMIZE</p>
      <Link href="/" className="mt-6 text-blue-600 underline">
        Zurück zur Startseite
      </Link>
    </div>
  );
}
