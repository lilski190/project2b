# Projket 2b TODO: ÜBERARBEITEN SIN DNOCH INHALtE VON MUX

Das ist das Frontend für unser Projekt in MUX im Sommersemester 2025.

## Getting Started

- Step 1: Repo clonen !!! Falls das mit dem Clonen nicht geht kann das daran liegen, dass Github nen Accestoken braucht. Wenn das so ist, sagt bescheid !!!
- Step 2: run npm install

```bash
npm install
```

- Step 3: Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

Wir werden das Projekt in Vercel deployen. Das ist noch auf der TODO liste
Das Projekt ist mit Vercel deployed und kann hier aufgerufen werden:
[Deployment mit Vercel](https://thb-mux.vercel.app/)

## Frameworks und Ressourchen

In diesem Projekt wurde DaisyUI und Tailwind für das Styling benutzt.
Die verwendete Icons und Grafiken sind von Verena und Ella erstellt worden.
Das Line und das Barchart wurden mit charts.js erstellt.

- [Next.js](https://nextjs.org/) – React Framework für SSR/SSG
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS Framework
- [DaisyUI](https://daisyui.com/) – UI-Komponenten für Tailwind
- [Vercel](https://vercel.com/) – Deployment-Plattform
- Freepik für illustrationen
- Heroicons für icons
- google fonts
- Fotos, Bilder und logos - eigene darstellung
- TODO: canvaTHTML? für export
- Supabase ala backedn service?

## Projektberihct

TODO: Projketbericht verlinken

## Was ist Was

In diesem Abschitt sind Erklärungen zu den einzelen Codeteilen. Ziel ist es den einzelnen Teammitgliedern einen leichten Zugang zu der Arbeit mit Next.js zu geben und einen Überblick zu verschaffen.

### Projektstruktur (Auszug) TODO

```
├── app/ # Routenstruktur (inkl. [lang]/ für sprachsteuerung)
│ ├── dashboard/
│ ├── login/
├── components/ # Wiederverwendbare UI-Komponenten
│ ├── buttons/
│ ├── cards/
├── lib/ # Hilfsfunktionen (z. B. getDictionary)
├── middleware.ts # Sprach- & Auth-Middleware
├── locales/ # Sprachdateien (de.json, en.json, ...)
├── public/ # Statische Assets`
```

### /app

In diesem Ordner sind die einzelen Routen und pages. Jeder Ordner in /app ist einen neu URL route, solange es in diesem Ornder die Datei page.js gibt (z.B. /login hat eine page.js)

#### /collection

Diese Page ist als Vorschau gedacht. Alle Componenten in dem Ordner /components sind hier aufgelistet. So können wir überprüfen, dass alle Einzelteile so aussehen wie sie sollen. Und wir können auch testen, wie sich die Komponenten mit den unterschidlichen Farbklassen und Sprachen verhalten.

### /components

Die Components sind die einzelen Bausteine der Website. Sie können auf UI Libarys wie Daisy UI basieren. (Andere Libarys sind bisher noch nicht eingerichtet) Gute Components sind Wiederverwendbar und Anpassungsfähig. Es können beliebig viele Componenten angelegt werden. Optimalerweise kann man sie in Unterordnern kategoriesieren (z.B. Buttons).

#### Beispiel eines Componenten: DefalutButton.js (mit Daisy UI):

![Defalut Button](/thb_mux/public/markdownImg/DefaultButton.png)

Das ist der Code des Button Components:

```
import React from "react";

const DefaultButton = () => {
  return <button className="btn">Default</button>;
};

export default DefaultButton;

```

Und die Verwendung in der Collection Page:

```
import { getDictionary } from "@/lib/getDictionary";
import DefaultButton from "@/app/components/buttons/defaultButton";

export default async function CollectionPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <div>Hier ist der Default Button:</div>
      <DefaultButton />
    </div>
  );
}
```

Durch die Weitergabe von Parametern kann der Button angepasst werden. Hier machen wir z.b. eine Anpassung mit dem Text und der Farbe:

![Defalut Buttons mit Farben und Text](/thb_mux/public/markdownImg/DefalutButtonColors.png)

Das ist der Code dazu:

```
//In dem Button Component:

import React from "react";

const DefaultButton = ({ text, colorClass }) => {
  return (
    <button className={`btn ${colorClass ? colorClass : "btn-neutral"}`}>
      {text ? text : "Default text"}
    </button>
  );
};

export default DefaultButton;

// In der Collection Page:

import { getDictionary } from "@/lib/getDictionary";
import DefaultButton from "@/app/components/buttons/defaultButton";

export default async function CollectionPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <div>Hier ist der Default Button in Verschieden Farben:</div>
      <DefaultButton />
      <DefaultButton text="Primary" colorClass="btn-primary" />
      <DefaultButton text="Secondary" colorClass="btn-secondary" />
      <DefaultButton text="Accent" colorClass="btn-accent" />
    </div>
  );
}
```

### global.css

Hier sind die globalen Css styles drin. Dazu gehören auch unsere Stylings:

```
.main {
  --color-base-100: oklch(100% 0 0);
  --color-base-200: oklch(93% 0 0);
  --color-base-300: oklch(86% 0 0);
  ...
}
```

### Sprachen

Die Sprachsteuerung wird über das Routing gemacht. Es gibt in /app den Ordner [lang] in dem alle anderen Routen drin sind. Die URL ist also z.B. https://localhost:3000/de/login oder https://localhost:3000/en/login bisher sind nur de und en als Sprachen angelegt. In dem ordner "locales" sind die json files für die beiden Sprachen. Die json können in den Pages so aufgerufen werden:

```
import { getDictionary } from "@/lib/getDictionary";

export default async function DashboardPage({ params }) {

const param = await params;
const lang = param.lang || "de";
const dict = await getDictionary(lang);

return (

<div>
<h1 className="mb-5 text-5xl font-bold">{dict.dashboard.title}</h1>
<h2> {dict.dashboard.welcome} </h2>
</div>
);
}
```

Es wird in der Route geschaut welche sprache ausgewählt ist und danach dann der Text zugeornet.
In dem JSON file gibt es keys für jede Page und in der Page sind dann die keys für jeden text. Es ist wichtig, dass die Keys in jeder language JSON gleich sind. Sonst können die nihct richtig zugeordent werden. (Ein key für die Page ist z.b "home" )

```
{
  "home": {
    "title": "Das ist der Deutsche Titel",
    "description": "Das ist die Deutsche Beschreibung"
  },
  "login": {
    "title": "Das ist der Deutsche Login Titel",
    "description": "Das ist die Deutsche Login Beschreibung",
    "login": "Einloggen"
  },
  "dashboard": {
    "title": "Das ist der Deutsche Dashboard Titel",
    "description": "Das ist die Deutsche Dashboard Beschreibung",
    "welcome": "Willkommen auf der Dashboard-Seite"
  }
}
```

Die Sprache kann mit dem Componenten "LanguageSwitcher.js" umgestellt werden. Wenn neue Sprachen hinzugefügt werden sollen, dann müssen die erst an mehreren stellen eingebunden werden.

#### Lokalisierte Inhalte

Im Ordner `locales/` liegen die JSON-Dateien für die verschiedenen Sprachen (`de.json`, `en.json` etc.). Diese JSON-Dateien enthalten die Übersetzungen für alle Seiten und werden in den Pages wie folgt genutzt:

```
import { getDictionary } from "@/lib/getDictionary";

export default async function DashboardPage({ params }) {
  const lang = params.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">{dict.dashboard.title}</h1>
      <h2>{dict.dashboard.welcome}</h2>
    </div>
  );
}
```

Die Funktion getDictionary(lang) lädt die passende Sprachdatei basierend auf dem URL-Parameter lang.

#### Struktur der JSON-Dateien

Jede Sprachdatei ist ein JSON-Objekt, in dem die Schlüssel (Keys) die Seiten und die Werte die Texte enthalten:

```
{
  "home": {
    "title": "Das ist der Deutsche Titel",
    "description": "Das ist die Deutsche Beschreibung"
  },
  "login": {
    "title": "Das ist der Deutsche Login Titel",
    "description": "Das ist die Deutsche Login Beschreibung",
    "login": "Einloggen"
  },
  "dashboard": {
    "title": "Das ist der Deutsche Dashboard Titel",
    "description": "Das ist die Deutsche Dashboard Beschreibung",
    "welcome": "Willkommen auf der Dashboard-Seite"
  }
}

```

Wichtig:
Die Keys müssen in allen Sprachdateien identisch sein, damit die Zuordnung korrekt funktioniert. Fehlt ein Key in einer Sprache, kann der Text dort nicht angezeigt werden.

**Öffentliche und geschützte Routen**

- Öffentliche Routen (z.B. `/`) sind für alle zugänglich.
- Geschützte Routen (z.B. `/dashboard`) sind nur für eingeloggte Nutzer mit gültigem Token zugänglich.
- Auth-Routen (z.B. `/login`) sind nur für nicht eingeloggte Nutzer zugänglich.

- **Token-Prüfung**  
  Überprüft, ob ein gültiges Authentifizierungs-Token (`token` Cookie) vorhanden ist, um Zugriff auf geschützte Bereiche zu erlauben.

- **Redirect-Logik**

  - Ungültige Sprache → Redirect zu `/de` + Pfad
  - Ungeloggte Nutzer auf geschützten Routen → Redirect zu `/[lang]/login`
  - Eingeloggte Nutzer auf Login-Seite → Redirect zu `/[lang]/dashboard`

  ## Server-side Rendering

Die App verwendet das App-Router-Feature von Next.js mit React Server Components.
Dadurch werden viele Seiten auf dem Server gerendert (SSR), was die Performance verbessert und SEO-freundlich ist. Componenten und Pages die mit dem User Interagieren (z.b. Forms) müssen aber weiterhin Client-Side gerendert werden. Als Schittstelle zwischen Client-Component und API werden Server Actions genutzt.

## Authentifizierung & Datenfluss

- Der Login erfolgt über ein externes Backend.
- Nach erfolgreichem Login wird ein `jwt token`-Cookie gesetzt (HttpOnly, Secure).
- Die Middleware prüft das Token bei geschützten Routen (`/dashboard` etc.).
- Das Token wird in Server Components genutzt, um geschützte Daten vom Backend zu laden.
- Ein Logout löscht den Token und redirectet zur Login-Seite.

# Next.js + Supabase Vereinsportal

Projektübersicht

Dieses Projekt ist eine Next.js-Anwendung mit Supabase-Integration, die als Vereinsportal dient. Es bietet Funktionen für Authentifizierung, Content-Management und Styling über einen Styleguide. Die Anwendung unterstützt Mehrsprachigkeit und verwendet Tailwind CSS für das Styling.
Inhaltsverzeichnis

    Home-Komponente

    Auth Actions (Login & Logout)

    Content Management Actions

    Styleguide Actions

    Error-Komponente

    Loading-Komponente

    404 NotFound-Komponente

    RootLayout

Home-Komponente

Beschreibung:
Startseite der Anwendung (public page). Zeigt Begrüßung, Einführungstext, Login- und Registrierungs-Buttons. Die Texte werden anhand des übergebenen Sprachparameters (lang) aus einem Wörterbuch geladen.

Features:

    Mehrsprachige Inhalte via getDictionary

    Navigation zu Login, Join und About-Seiten

Auth Actions (Login & Logout)
loginAction(formData)

Authentifiziert einen Benutzer über Supabase mit Email und Passwort.
Bei Erfolg werden Authentifizierungstoken und zusätzliche Vereins- und Mitgliedsdaten in Cookies gespeichert und der Nutzer zum Dashboard weitergeleitet. Bei Fehler wird eine Fehlermeldung zurückgegeben.
logoutAction()

Meldet den Benutzer über Supabase ab und löscht die gespeicherten Session-Cookies.
getLoginData(vereinName)

Hilfsfunktion, die Mitglieds- und Vereinsdaten prüft und zurückgibt. Verifiziert, ob der Vereinsname mit dem im Member-Datensatz übereinstimmt.
Content Management Actions
getSpecificContentAction(id)

Lädt einen spezifischen Content-Eintrag anhand der Content-ID und der Vereins-ID aus Cookies. Autorisiert nur Vereinsmitglieder.
updateContent(formData, template, contentID, author, tags, title)

Aktualisiert einen bestehenden Content-Datensatz für den Verein anhand der übergebenen Parameter.
createContent(formData, template, author, tags, title)

Erstellt einen neuen Content-Eintrag für den Verein.
loadAllContent()

Lädt alle Content-Einträge für den Verein.
Styleguide Actions
getStyleguideAction()

Lädt den Styleguide des Vereins basierend auf der Vereins-ID aus den Cookies.
saveStyleguideAction(formData)

Aktualisiert den Styleguide des Vereins mit den neuen Werten aus dem Formular.
Error-Komponente

Zeigt eine Fehlerseite an, wenn ein unerwarteter Fehler auftritt. Loggt den Fehler in der Konsole und bietet einen Button zum Neuladen der Seite.
Loading-Komponente

Zeigt einen Ladebildschirm an, solange die Anwendung Daten lädt.
404 NotFound-Komponente

Anzeige einer benutzerfreundlichen 404-Fehlerseite bei nicht gefundenen Routen. Enthält eine Nachricht und einen Link zur Startseite.
RootLayout

Root-Layout-Komponente, die globale Fonts und grundlegende HTML-Struktur setzt. Unterstützt Mehrsprachigkeit, legt Sprache auf <html>-Tag fest und bindet Google Fonts über next/font/google ein.
Nutzungshinweise

    Alle serverseitigen Actions nutzen das Next.js cookies-API für Authentifizierung via Cookies.

    Supabase ist zentrale Datenbank- und Authentifizierungslösung.

    Styling erfolgt überwiegend mit Tailwind CSS.

    Die Anwendung unterstützt eine modulare, mehrsprachige Struktur.

## 🧩 Komponenten zur Layereinstellung

Dieses Modul stellt drei React-Komponenten zur Verfügung, mit denen visuelle Ebenen flexibel konfiguriert werden können. Alle greifen auf ein `Styleguide`-Objekt aus `localStorage` zu.

### Komponenten

#### `LayerComponent`

Konfiguriert generische Layout-Ebenen mit Optionen wie:

- Hintergrundfarbe (`bg`)
- Deckkraft (`opacity`)
- Größe (`size`, `sizeW`)
- Positionierung (`posLayer`)
- Textausrichtung (`textAlign`)
- SVG-Auswahl (`svg`)

#### `LogoComponent`

Ermöglicht die Auswahl und Platzierung eines Logos:

- Hintergrund (`bg`)
- Deckkraft, Größe, Position (`opacity`, `size`, `posLayer`)
- Auswahl aus Logos im Styleguide (`logo`)

#### `TextLayerComponent`

Für textbasierte Ebenen:

- Textfarbe (`bg`)
- Breite (`sizeW`)
- Positionierung (`posLayer`)

### Gemeinsame Props

| Prop        | Typ        | Beschreibung                    |
| ----------- | ---------- | ------------------------------- |
| `fieldID`   | `string`   | Eindeutiger Feldname            |
| `Textvalue` | `Array`    | Initialwerte für die Layer      |
| `onChange`  | `function` | Callback bei Änderungen         |
| `options`   | `string[]` | Aktivierte Einstellungsoptionen |

## Input-Komponenten Übersicht

In diesem Projekt gibt es mehrere wiederverwendbare React-Komponenten für verschiedene Eingabetypen:
FileUpload / LogoUpload / TextureUpload

    Beschreibung: Komponenten zum Hochladen von Dateien (z.B. Texturen, Logos) mit Drag & Drop und Vorschau.

    Props:

        onFileUploaded(url: string): Callback, der die öffentliche URL der hochgeladenen Datei liefert.

        dict: Übersetzungsobjekt für UI-Texte (buttonText, modalTitle).

        fieldID: String, wird als id und name für das Input-Element genutzt.

        url: Anfangs-URL der Datei (optional).

        BASEURL: Basis-URL der Supabase Storage Instanz.

        folderID: Zielordner im Storage.

        bucket: Bucket-Name im Storage.

        imgAlt: Alt-Text für die Bildvorschau (optional).

FontSelector

    Beschreibung: Dropdown zum Auswählen von Schriftarten.

    Props:

        onChange(className: string): Callback mit der ausgewählten Font-Klasse.

        fieldID: ID und Name des versteckten Inputs.

        defaultFont: Standard-Schriftart (optional).

RadioButton

    Beschreibung: Gruppe von Radio Buttons.

    Props:

        fieldID: Name der Radio-Gruppe.

        Textvalue: Anfangsauswahl (optional).

        onChange(event): Callback bei Auswahländerung.

        options: Array von Strings für die Radio-Optionen.

TextArea

    Beschreibung: Einfaches Texteingabefeld.

    Props:

        fieldID: ID und Name des Textfelds.

        Textvalue: Anfangswert (optional).

        onChange(event): Callback bei Texteingabe.

LoginForm

Beschreibung:
Ein einfaches Login-Formular mit Verein-Auswahl, E-Mail- und Passwort-Feldern. Die Auswahl des Vereins erfolgt per Dropdown, die Eingaben werden über das loginAction-Formular-Action verarbeitet.

Props:

    dict — Objekt mit Übersetzungen, z.B. für Button-Texte.

Verwendung:

<LoginForm dict={{ login: { login: "Einloggen" } }} />

Features:

    Verein-Auswahl aus vordefiniertem Array VEREINE.

    Validierte Eingabefelder (E-Mail und Passwort).

    Styled mit Tailwind CSS und DaisyUI.

    Fehler- und Erfolgsmeldungen via react-hot-toast.

# UI-Komponenten Übersicht

In diesem Abschnitt werden die sechs zentralen React-Komponenten beschrieben, die in diesem Projekt verwendet werden. Jede Komponente bietet Eingabefelder zur Konfiguration verschiedener Stil- und Designelemente.

---

## 1. Backgrounds

Komponente zur Verwaltung von Hintergrundtexturen.

- Zeigt Upload-Felder für helle (`light_01`, `light_02`) und dunkle (`dark_01`, `dark_02`) Hintergrundtexturen an.
- Nutzt die `TextureUpload` Komponente.
- Props:
  - `backgrounds`: Objekt mit URLs der Texturen.
  - `dict`: Wörterbuch für UI-Texte und Bildbeschreibungen.
  - `folderID`: ID des Upload-Ordners.

---

## 2. Colors

Komponente zur Auswahl von Farben über versteckte Farbfelder.

- Enthält Farb-Picker für verschiedene Kategorien: `main`, `detail`, `text` und `neutral`.
- Nutzt die `ColorPicker` Komponente.
- Props:
  - `colors`: Objekt mit aktuellen Farbwerten.
  - `dict`: Wörterbuch für UI-Texte.

---

## 3. FontSelectors

Komponente zur Auswahl von Schriftarten.

- Ermöglicht die Auswahl von Schriftfamilien für Überschriften und Fließtext.
- Zeigt eine Vorschau des gewählten Fonts an.
- Nutzt die `FontSelector` Komponente.
- Props:
  - `dict`: Wörterbuch für UI-Texte.
  - `fonts`: Objekt mit Standard-Schriftfamilien für Heading und Body.

---

## 4. Grafics

Komponente zur Verwaltung von grafischen Uploads.

- Zeigt Upload-Felder für verschiedene Formen (`form_01` bis `form_04`) und Grafiken (`grafik_01` bis `grafik_04`).
- Nutzt die `TextureUpload` Komponente.
- Props:
  - `grafics`: Objekt mit URLs der Grafiken.
  - `dict`: Wörterbuch für UI-Texte und Upload-Konfiguration.
  - `folderID`: ID des Upload-Ordners.

---

## 5. Logos

Komponente zur Verwaltung von Logo-Uploads.

- Ermöglicht das Hochladen von großem Logo, kleinem Logo und einfarbigem Logo.
- Nutzt die `LogoUpload` Komponente.
- Props:
  - `dict`: Wörterbuch für UI-Texte.
  - `folderID`: ID des Upload-Ordners.
  - `logo`: Objekt mit URLs der Logos.

---

## 6. Slogan

Komponente zur Eingabe eines Slogans.

- Zeigt ein TextArea-Inputfeld für den Slogan.
- Nutzt die `TextArea` Komponente.
- Props:
  - `colors`: (Optional) Farben-Objekt (derzeit ungenutzt).
  - `dict`: Wörterbuch für UI-Texte (derzeit ungenutzt).
  - `text`: Der aktuelle Textwert des Slogans.

---

Diese Komponenten bilden die Grundlage für die Gestaltung und Individualisierung des Designs und der Inhalte im Projekt.

# BasicTable Komponente

`BasicTable` zeigt Daten in einer sortier- und filterbaren Tabelle an.

## Props

- `headlines` (string[]): Spaltenüberschriften
- `content` (object[]): Datenobjekte mit Feldern wie `title`, `author`, `tags` etc.
- `filter` (string[]): Verfügbare Tags zum Filtern
- `colKeys` (string[]): Schlüssel für Spalten

## Features

- Sortierung per Klick auf Spalten (außer `tags` und `id`)
- Filterung nach Tags und Autoren via Dropdown
- Bearbeiten- und Duplizieren-Buttons je Zeile
- Datumssortierung unterstützt ISO-Datumsstrings

## Beispiel

```jsx
<BasicTable
  headlines={["Titel", "Datum", "Autor", "Tags"]}
  content={[
    {
      id: 1,
      title: "Test",
      last_update: "2024-07-23",
      author: ["Max"],
      tags: ["React"],
      template: "default",
    },
  ]}
  filter={["React", "JavaScript"]}
  colKeys={["title", "last_update", "author", "tags"]}
/>
```

## 🖼️ Media-Komponenten (ImageWithText, ImageGallery, GraphicWithText)

Diese Komponenten dienen zur Darstellung und Export von Medieninhalten.

---

### `ImageWithText`

Zeigt ein Bild mit Text, Logo und Layer – inklusive Export (PNG, PDF, HTML).

```jsx
<ImageWithText previewData={data} options={exportOptions} />
```

---

### `ImageGallery`

Grid-basierte Bildgalerie.

```jsx
<ImageGallery images={[img1, img2, ...]} />
```

---

### `GraphicWithText`

Einzelnes Bild mit erklärendem Text.

```jsx
<GraphicWithText image={imgUrl} description="..." />
```

---

### 🔧 Gemeinsame Funktionen

- **Dynamic Styling:** Fonts & Farben via `Styleguide` (localStorage)
- **Responsive Layouts:** Mobile- & Desktop-optimiert (Tailwind)
- **Image Handling:** `Image` (Next.js), `html2canvas`, `jsPDF`
- **Base64 Support:** für sichere Bildverarbeitung (Logo/Image Export)

```ts
getImageAsBase64(url); // lädt Bilder als Base64
percentToHexAlpha(p); // konvertiert Transparenz in Hex-Alpha
```

---

> Alle Komponenten sind modular und auf Design- & Content-Vorschau ausgerichtet.

## StyleguideLoader

`StyleguideLoader` ist eine React-Komponente, die beim ersten Laden einer Seite automatisch die aktuellen Styleguide-Daten vom Server abruft.

### Zweck

Diese Komponente dient dazu, beim Start der Anwendung (Client-seitig) den Styleguide zu laden und lokal zu speichern, damit andere Komponenten auf diese Daten zugreifen können – ohne weitere Netzwerkabfragen.

### Funktionsweise

- Wird beim Rendern sofort ausgeführt (`useEffect` mit leerem Dependency-Array).
- Holt asynchron die Daten mit `getStyleguideAction`.
- Speichert den Rückgabewert als JSON-String im `localStorage` unter dem Schlüssel `"Styleguide"`.
- Gibt `null` zurück und hat keine sichtbare UI.

### Verwendung

```jsx
<StyleguideLoader />

    Hinweis: Die Komponente sollte nur einmal auf einer Seite verwendet werden, z. B. in einem globalen Layout oder in einer übergeordneten App-Komponente.
```

## LanguageSwitcher

Die `LanguageSwitcher`-Komponente ermöglicht es dem Benutzer, die Sprache der Anwendung über ein Dropdown-Menü zu ändern.

### Funktionen

- Ermittelt die aktuelle Sprache anhand der URL (`/de/...`, `/en/...`, etc.).
- Bietet ein Dropdown-Menü mit den verfügbaren Sprachoptionen:
  - Deutsch (`de`)
  - Englisch (`en`)
  - Leichte Sprache (`deLS`)
- Ändert die URL dynamisch, ohne die Seite komplett neu zu laden.
- Beibehaltung von Query-Parametern bei Sprachwechsel.
- Verwendet Tailwind CSS und DaisyUI für das Styling.

### Verhalten

Beim Sprachwechsel:

- Das erste URL-Segment (`/de/`, `/en/`, ...) wird ersetzt.
- Query-Parameter (`?foo=bar`) bleiben erhalten.
- Die Seite wird per `router.push()` auf die neue URL navigiert.

### Beispiel

```jsx
<LanguageSwitcher />

    🔁 Diese Komponente kann überall in der App eingebunden werden, z. B. im Header oder in der Navigation.
```

## Middleware für Sprache und Authentifizierung

- Prüft, ob die URL mit einer unterstützten Sprache (`de`, `en`, `deLS`) beginnt; andernfalls Weiterleitung zu `/de`.
- Schützt geschützte Routen und leitet nicht angemeldete Nutzer zur Login-Seite.
- Leitet angemeldete Nutzer von der Login-Seite zum Dashboard weiter.
- Nutzt Supabase zur Benutzer-Authentifizierung.
- Wird auf alle Routen außer Next.js-interne, API und favicon angewendet.
