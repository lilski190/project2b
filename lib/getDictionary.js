export async function getDictionary(lang) {
  return (await import(`@/locales/${lang}.json`)).default;
}
