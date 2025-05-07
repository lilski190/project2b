/**
 * Wörterbuch-Importfunktion
 * Diese Funktion importiert ein Wörterbuch-Objekt aus einer JSON-Datei basierend auf der angegebenen Sprache.
 * @param {string} lang - Die Sprache, für die das Wörterbuch geladen werden soll
 */
export async function getDictionary(lang) {
  return (await import(`@/locales/${lang}.json`)).default;
}
