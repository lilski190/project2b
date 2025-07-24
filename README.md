# Projekt 2b – Verein\*t

Dieses Projekt trägt den Namen **Verein\*t** und ist im Sommersemester 2025 im Rahmen des Faches "Projekt 2b" an der Technischen Hochschule Brandenburg entstanden.  
Es handelt sich um eine Next.js-Anwendung mit Supabase-Integration als Backend-Service. Ziel ist die Entwicklung eines digitalen Prototyps einer modularen Website, die speziell Kulturvereinen hilft, ihren Außenauftritt professionell und ohne externe Hilfe zu gestalten. Nutzer\*innen können ein zentrales Corporate Design definieren (Farben, Logos, Schriften), das automatisch auf alle Inhalte angewendet wird.

## Kernfunktionen

- Styleguide-Editor zur Pflege des Designs
- Content-Erstellung mit vorgegebenen Layouts
- Inhaltsverwaltung zur Organisation von Beiträgen
- Exportfunktion für verschiedene Kanäle (z. B. Social Media, Print)

## Hintergrund

Kulturvereine leisten einen wichtigen Beitrag zur Gesellschaft, da sie soziale, kulturelle und integrative Aufgaben übernehmen. Sie organisieren Veranstaltungen, fördern Teilhabe und schaffen Begegnungsräume. Dabei sind sie oft unterfinanziert, personell schwach aufgestellt und auf ehrenamtliches Engagement angewiesen. Besonders im Bereich der Öffentlichkeitsarbeit fehlen häufig Design-, Medien- und Technologiekompetenz. Das erschwert einen professionellen und konsistenten Außenauftritt – obwohl dieser essenziell für Sichtbarkeit, Mitgliedergewinnung und Förderung ist.

## Getting Started

1. Repo klonen
2. Abhängigkeiten installieren:

```bash
npm install
```

3. Entwicklungsserver starten:

```bash
npm run dev
# oder
yarn dev
# oder
pnpm dev
# oder
bun dev
```

Seite aufrufen: [http://localhost:3000](http://localhost:3000)

## Deployment

Das Projekt ist auf Vercel deployed und hier erreichbar:  
[https://project2b-five.vercel.app/de](https://project2b-five.vercel.app/de)

## Frameworks und Ressourcen

Verwendete Technologien:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Vercel](https://vercel.com/)
- Supabase (Datenbank und Auth)
- Charts.js (für Diagramme)
- Canva2HTML (Exportfunktion)
- Heroicons, Google Fonts, Freepik
- Eigene Bilder & Logos (Ella & Verena)

## Technische Umsetzung

Ausführlichere technische Infos befinden sich als Kommentare im Quellcode.

### Server-side Rendering (SSR)

Verwendung des App-Routers von Next.js mit React Server Components.  
Client-Komponenten kommunizieren über **Server Actions** mit dem Backend (Supabase).

### Authentifizierung & Sicherheit

- Supabase Policies & Auth-Token
- Cookie-basierte Sitzungen (HttpOnly, Secure)
- Middleware für Routen-Schutz, Spracherkennung & Redirect-Logik

### Projektstruktur

```
├── app/               # Routen & Pages (inkl. Sprachsteuerung)
├── components/        # Wiederverwendbare UI-Komponenten
├── lib/               # Hilfsfunktionen
├── locales/           # Sprachdateien (de, en, deLS)
├── middleware.ts      # Sprache & Auth
├── public/            # Statische Assets
```

## Seiten & Komponenten

### Öffentliche Seiten

- **/** Startseite mit Einstieg & Infos
- **/about** Projektinformationen
- **/join** Teilnahme an Testphase
- **/impressum** Rechtliches

### Authentifizierungsseiten

- **/login** Login mit Vereinsauswahl

### Private Seiten

- **/dashboard** Zentrale Übersicht mit persönlichem Header
- **/styleguide** Farben, Schriften, Logos etc. verwalten
- **/templates** Auswahl von Layout-Vorlagen
- **/create** Content-Erstellung mit Exportfunktion
- **/content** Übersicht & Verwaltung aller Inhalte

## Komponentenstruktur

- Komponenten in Unterordnern wie `buttons/`, `cards/` usw.
- Parameter-gesteuert & wiederverwendbar
- Eingabe-Komponenten: FileUpload, FontSelector, RadioButton, TextArea

### Beispiel-Komponenten

- **LayerComponent / LogoComponent / TextLayerComponent** – für Layouts
- **BasicTable** – Filter- & sortierbare Tabelle
- **ImageWithText / ImageGallery / GraphicWithText** – Medienkomponenten

## Sprachsteuerung

- Mehrsprachigkeit über `[lang]`-Ordner und `locales/*.json`
- Sprachwechsel über `LanguageSwitcher`
- Übersetzungen via `getDictionary(lang)` eingebunden

### Beispiel:

```ts
import { getDictionary } from "@/lib/getDictionary";

export default async function DashboardPage({ params }) {
  const dict = await getDictionary(params.lang || "de");
  return (
    <div>
      <h1>{dict.dashboard.title}</h1>
    </div>
  );
}
```

## Server Actions

### Auth

- `loginAction(formData)` – Login, Cookies setzen
- `logoutAction()` – Logout, Cookies löschen
- `getLoginData(vereinName)` – Prüfung & Datenabruf

### Content

- `createContent(...)`, `updateContent(...)`, `getSpecificContentAction(id)`
- `loadAllContent()` – Liste aller Inhalte

### Styleguide

- `getStyleguideAction()`
- `saveStyleguideAction(formData)`

---

**Hinweis:** Diese README bietet eine Übersicht. Weitere Details bitte direkt im Code und den Kommentaren nachlesen.
