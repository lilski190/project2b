/**
 * Loading-Komponente für die Anwendung.
 * Diese Komponente wird angezeigt, während die Anwendung lädt.
 *
 * @returns {JSX.Element} Ein Lade-Spinner mit Text, der zentriert auf dem Bildschirm angezeigt wird.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">⏳ Wird geladen... </p>
    </div>
  );
}
