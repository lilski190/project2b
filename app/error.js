"use client"; // wichtig! Muss ein Client Component sein

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Ein unerwarteter Fehler ist aufgetreten:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold">
        😵 Upps! Ein Fehler ist aufgetreten
      </h1>
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
