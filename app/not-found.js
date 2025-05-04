import Link from "next/link";

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
