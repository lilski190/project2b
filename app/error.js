"use client";

import { useEffect } from "react";

/**
 * Error-Komponente für die Fehlerbehandlung in der Anwendung.
 * Wird angezeigt, wenn ein unerwarteter Fehler auftritt.
 * Zeigt eine Fehlermeldung an und bietet einen Button zum Neuladen der Seite.
 *
 * @param {object} props
 * @param {Error} props.error - Das Error-Objekt, das gefangen wurde.
 * @param {() => void} props.reset - Funktion zum Zurücksetzen des Error-States (z.B. Seite neu laden).
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Ein unerwarteter Fehler ist aufgetreten:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold">Ein Fehler ist aufgetreten</h1>
      <p className="mt-2 text-gray-600">Etwas ist schiefgelaufen.</p>

      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Seite neu laden
      </button>
    </div>
  );
}
