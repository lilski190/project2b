import Link from "next/link";

/**
 * 404-Seite für nicht gefundene Routen in einer Next.js-Anwendung.
 * Diese Seite wird angezeigt, wenn der Benutzer eine Route aufruft, die nicht existiert.
 * Sie zeigt eine Fehlermeldung und bietet einen Link zurück zur Startseite.
 *
 * @returns {JSX.Element} Die UI-Komponente für die 404-Fehlerseite.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Seite nicht gefunden</h1>
      <p className="mt-4">Die angeforderte Seite existiert nicht.</p>
      <Link href="/" className="mt-6 text-blue-600 underline">
        Zurück zur Startseite
      </Link>
    </div>
  );
}
