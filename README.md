# Projket 2b TODO: ÜBERARBEITEN SIN DNOCH INHALtE VON MUX

Dieses Projekt trägt den Namen Verein*t und ist im Sommersemester 2025 im Rahem des Faches "Pfojekt 2b" and der Technischen Hochschule Brandenburg entstanden. Bei dem Projekt handelt es sich um eine Next.js-Anwendung mit Supabase-Integration als Backend Service. Ziel des Projektes ist es einen digitalen Prototypen einer modulare Website zu entwickeln , die speziell Kulturvereinen hilft, ihren Außenauftritt professionell und ohne externe Hilfe zu gestalten. Nutzer*innen können ein zentrales Corporate Design definieren (Farben, Logos, Schriften), das automatisch auf alle Inhalte angewendet wird.

Kernfunktionen sind:

- ein Styleguide-Editor zur Pflege des Designs,
- einfache Content-Erstellung mit vorgegebenen Layouts,
- eine Inhaltsverwaltung zur Organisation von Beiträgen,
- sowie eine Exportfunktion für verschiedene Kanäle (z. B. Social Media, Print).

Der Hintergrundgedanke des Projketes ist:
Kulturvereine leisten einen wichtigen Beitrag zur Gesellschaft, da sie soziale, kulturelle und integrative Aufgaben übernehmen. Sie organisieren Veranstaltungen, fördern Teilhabe und schaffen Begeg-nungsräume. Dabei sind sie häufig unterfinanziert, personell schwach aufgestellt und auf ehrenamtli-ches Engagement angewiesen. Insbesondere im Bereich der Öffentlichkeitsarbeit fehlt es oft an De-sign-, Medien- und Technologiekompetenz. Dies führt dazu, dass viele Vereine keinen professionellen und konsistenten Außenauftritt realisieren können – obwohl dieser zunehmend entscheidend für Sichtbarkeit, Mitgliedergewinnung und Förderungen ist.

## Getting Started

- Step 1: Repo clonen
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

Das Projekt ist mit Vercel deployed und kann hier aufgerufen werden:
[Deployment mit Vercel](https://project2b-five.vercel.app/de)

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
- canva2HTML - für exportfunktion
- Supabase - als backend service

# Technische Umsetzung

Dieser Abschitt bietet eine Überscht der Technischen Umsetztung des Projektet. Weiter Destallierte INformatioen finden sich in form von Code Commentaren in den jewailligen Files.

## Server-side Rendering

Die App verwendet das App-Router-Feature von Next.js mit React Server Components.
Dadurch werden viele Seiten auf dem Server gerendert (SSR), was die Performance verbessert. Componenten und Pages die mit dem User Interagieren (z.b. Forms) müssen aber weiterhin Client-Side gerendert werden. Als Schittstelle zwischen Client-Component und API werden Server Actions genutzt.

## Authentifizierung und Sicherheit

Die Anwendung Verwendet als Datensicherheit die vorgegeben Supabase Strukturen mit angepassten Supabase Policys.
Für die USer Authetifizeirrung/Login wird zudem die hauseigene Supabase autentifizeirung mit Tokens verwendet. Nach erfolgreichem Login wird ein `jwt token`-Cookie gesetzt (HttpOnly, Secure).

### Middleware

Da dieses Projekt den App Router von Next.js nutzt ist es wichtig die "privaten" seiten auf Frontendseite durch eine Middleware zu schützten. Die Middleware hat dabei mehrere aufgaben und funktionen.

**Öffentliche und geschützte Routen**
ES wird überprüft zu welcher Routenart die Route die grade aufgerufen werden soll gehört.

- Öffentliche Routen (z.B. `/`) sind für alle zugänglich.
- Geschützte Routen (z.B. `/dashboard`) sind nur für eingeloggte Nutzer mit gültigem Token zugänglich.
- Auth-Routen (z.B. `/login`) sind nur für nicht eingeloggte Nutzer zugänglich.

**Token-Prüfung**  
 Überprüft, ob ein gültiges Authentifizierungs-Token (`token` Cookie) vorhanden ist, um Zugriff auf geschützte Bereiche zu erlauben.

**Redirect-Logik**

- Ungültige Sprache → Redirect zu `/de` + Pfad
- Ungeloggte Nutzer auf geschützten Routen → Redirect zu `/[lang]/login`
- Eingeloggte Nutzer auf Login-Seite → Redirect zu `/[lang]/dashboard`

# Was ist Was

Das Projekt setzt sich aus verschiedenen Pages, Componenten und Funktionen zusammen im Folgenden soll die Projektstrukture sowie einzelne Pages und Compoenneen erläutert werden.

## Projektstruktur (Auszug)

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

### App Folder

In diesem Ordner sind die einzelen Routen und pages. Jeder Ordner in /app ist einen neu URL route, solange es in diesem Ornder die Datei page.js gibt (z.B. /login hat eine page.js) Die Pages bilden die Unterschidlichen Bereiche des Projektes ab.

#### Public Pages

Public können immer aufgerufen werden.
**Home (/)**
Auf der Homepage wird der user Begrüßt und bekommt die möglichkeit über buttons zu loginseite zu kommen oder mehr zu den hintergründen des Projektes zu erfahren.

**About (/about)**
gibt dem User einige hintergrundinformationen zu dem Projekt.

**Join (/join)**
für User die sich für das Projekt interesieren ist auf dieser Seite die möglichkeit kontakt aufzu-nehmen und in der testphase mitzuwirken.

**Impressum (/impressum)**
die wichtigsten informationen und kontaktdaten zu dem Projket.

#### Authentication Pages

Die Authentifizeirungsrouten können nur aufgerufen werden, wenn der Nutzer nicht eingeloggt ist.
**Login (/login)**
Hier kann sich der User mit dem Vereinsnahmen, email und passwort anmelden. Die Loginaction schreibt nach erfolgreichem login die wichtigsten daten in die Cookies und der User erhält zugriff auf die Private routes.

#### Private Pages

**Dashboard (/dashboard)**
auf diese seite wird der User geleitet anchdem er sich eingeloggt hat. Er gibt hier einen Personalisierten Header, der das logo des vereins, den Verein und usernamen enthält sowie die hauptfarben des vereins im hintergrund hat. Von der dashboardseite aus hat der user zugriff auf die 3 Kernfunktionen der anwendung: Styleguide, Contentliste und Contenterstellung.
**Styleguide (/styleguide)**
umfasst ein Interaktives Formular in dem der User Farben, Schirftarten und Files ändern und Speichern kann.
**Templates (/templates)**
beinhaltet aktuell 3 unterschideliche Vorlagen 1. Ein einfaches Bild mit Text 2. Eine bil-derGallery 3. Ein Text mit Grafik; die Templates können ausgwählt werden und leiten den User dann zur Create seite weiter
**Create (/create)**
hier kann der User das Template mit inhalten füllen und eingie personalisierungen und än-derrungen vornehmen. Die Styles wie farben , logos oder schriftart werden automatisch aus dem styleguide übernommen Beim speichern des Contents kann man sowohl neuen erstellen als auch alten content updaten. Zusätzlich kann der contnent hier in den unterschidlichen Formaten exportiert werden.
**Content (/content)**
Hier wird eine Liste des gesammten contents des vereins abgerufen. Diesen kann man sor-tieren, filtern oder einen einzelnen content mit bearbeiten oder duplizieren in der create seite aufrufen.

### Komponente Folder

Die Components sind die einzelen Bausteine der Website. Sie können auf UI Libarys wie Daisy UI basieren oder auch andere Libarys und Frameworks nutzen (nicht in diesem Projekt). Gute Components sind Wiederverwendbar und Anpassungsfähig. Für die dymanische Verwendbarkeit nutzen die Components Paramenter ({params}). Das sind z.b. Farben, Text oder auch funktionen. Es können beliebig viele Componenten angelegt werden. Optimalerweise kann man sie in Unterordnern kategoriesieren (z.B. Buttons, Cards, Tooltips etc).

#### `LayerComponent`, `LogoComponent` und `TextLayerComponent`

Wird zur Erstellung von Content verwendet.
Konfiguriert generische Layout-Ebenen mit Optionen wie:

- Hintergrundfarbe (`bg`)
- Deckkraft (`opacity`)
- Größe (`size`, `sizeW`)
- Positionierung (`posLayer`)
- Textausrichtung (`textAlign`)
- SVG-Auswahl (`svg`)
- Auswahl aus Logos im Styleguide (`logo`)
- Textfarbe (`bg`)

**Props**
| Prop | Typ | Beschreibung |
| ----------- | ---------- | ------------------------------- |
| `fieldID` | `string` | Eindeutiger Feldname |
| `Textvalue` | `Array` | Initialwerte für die Layer |
| `onChange` | `function` | Callback bei Änderungen |
| `options` | `string[]` | Aktivierte Einstellungsoptionen |

#### Input-Komponenten Übersicht

In diesem Projekt gibt es mehrere wiederverwendbare React-Komponenten für verschiedene Eingabetypen. (Input felder)

**FileUpload / LogoUpload / TextureUpload**
Komponenten zum Hochladen von Dateien (z.B. Texturen, Logos) mit Drag & Drop und Vorschau.

**FontSelector**
Dropdown zum Auswählen von Schriftarten.

**RadioButton**
Gruppe von Radio Buttons.

**TextArea**
Einfaches Texteingabefeld.

#### LoginForm

Ein einfaches Login-Formular mit Verein-Auswahl, E-Mail- und Passwort-Feldern. Die Auswahl des Vereins erfolgt per Dropdown, die Eingaben werden über das loginAction-Formular-Action verarbeitet.

Verwendung:

```
<LoginForm dict={{ login: { login: "Einloggen" } }} />
```

#### UI-Komponenten Übersicht

In diesem Abschnitt werden die sechs zentralen React-Komponenten beschrieben, die in diesem Projekt verwendet werden. Jede Komponente bietet Eingabefelder zur Konfiguration verschiedener Stil- und Designelemente. Diese Komponenten bilden die Grundlage für den Styleguide in diesem Projekt.

**1. Backgrounds**
Komponente zur Verwaltung von Hintergrundtexturen.
Zeigt Upload-Felder für helle (`light_01`, `light_02`) und dunkle (`dark_01`, `dark_02`) Hintergrundtexturen an und nutzt die `TextureUpload` Komponente.

**2. Colors**
Komponente zur Auswahl von Farben. Enthält Farb-Picker für verschiedene Kategorien.Nutzt die `ColorPicker` Komponente.

**3. FontSelectors**
Komponente zur Auswahl von Schriftarten. Ermöglicht die Auswahl von Schriftfamilien für Überschriften und Fließtext. Zeigt eine Vorschau des gewählten Fonts an. Nutzt die `FontSelector` Komponente.

**4. Grafics**
Komponente zur Verwaltung von grafischen Uploads. Zeigt Upload-Felder für verschiedene Grafiken. Nutzt die `TextureUpload` Komponente.

**5. Logos**
Komponente zur Verwaltung von Logo-Uploads. Ermöglicht das Hochladen von großem Logo, kleinem Logo und einfarbigem Logo Nutzt die `LogoUpload` Komponente.

**6. Slogan**
Komponente zur Eingabe eines Slogans. Zeigt ein TextArea-Inputfeld für den Slogan. Nutzt die `TextArea` Komponente.

#### BasicTable Komponente

`BasicTable` zeigt Daten in einer sortier- und filterbaren Tabelle an.
**Features:**

- Sortierung per Klick auf Spalten (außer `tags` und `id`)
- Filterung nach Tags und Autoren via Dropdown
- Bearbeiten- und Duplizieren-Buttons je Zeile
- Datumssortierung unterstützt ISO-Datumsstrings

#### Media-Komponenten (ImageWithText, ImageGallery, GraphicWithText)

Diese Komponenten dienen zur Darstellung und Export von Medieninhalten. Alle Komponenten sind modular und auf Create Component und die Content-Vorschau ausgerichtet.

**`ImageWithText`**

Zeigt ein Bild mit Text, Logo und Layer – inklusive Export (PNG, PDF, HTML).

```jsx
<ImageWithText previewData={data} options={exportOptions} />
```

**`ImageGallery`**

Grid-basierte Bildgalerie.

```jsx
<ImageGallery images={[img1, img2, ...]} />
```

**`GraphicWithText`**

Einzelnes Bild mit erklärendem Text.

```jsx
<GraphicWithText image={imgUrl} description="..." />
```

Gemeinsame Funktionen:

- **Dynamic Styling:** Fonts & Farben via `Styleguide` (localStorage)
- **Responsive Layouts:** Mobile- & Desktop-optimiert (Tailwind)
- **Image Handling:** `Image` (Next.js), `html2canvas`, `jsPDF`
- **Base64 Support:** für sichere Bildverarbeitung (Logo/Image Export)

```ts
getImageAsBase64(url); // lädt Bilder als Base64
percentToHexAlpha(p); // konvertiert Transparenz in Hex-Alpha
```

#### StyleguideLoader

`StyleguideLoader` ist eine React-Komponente, die beim ersten Laden einer Seite automatisch die aktuellen Styleguide-Daten vom Server abruft. Diese Komponente dient dazu, beim Start der Anwendung (Client-seitig) den Styleguide zu laden und lokal zu speichern, damit andere Komponenten auf diese Daten zugreifen können – ohne weitere Netzwerkabfragen.

### Sprachen

#### LanguageSwitcher

Die `LanguageSwitcher`-Komponente ermöglicht es dem Benutzer, die Sprache der Anwendung über ein Dropdown-Menü zu ändern.

Nach wechels der Sprache wird die Sprachsteuerung wird über das Routing gemacht. Es gibt in /app den Ordner [lang] in dem alle anderen Routen/ Pages des Projketes drin sind. Die URL ist also z.B. https://localhost:3000/de/login oder https://localhost:3000/en/login bisher sind als Sprachen de, en und deLS (deusch als leichte Sprache) angelegt. In dem ordner "locales" sind die json files für alle Sprachen. Die json Dateien werden mit der hilfsfunktion getDictionary aufgeufen und können in alles Files genutzt werden wie in diesem Codebeispiel:

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

Konkret wird in der Route geschaut welche sprache ausgewählt ist und danach dann der Text zugeornet.
In dem JSON file gibt es keys für jede Page und in der Page sind dann die keys für jeden text.

Wichtig:
Die Keys müssen in allen Sprachdateien identisch sein, damit die Zuordnung korrekt funktioniert. Fehlt ein Key in einer Sprache, kann der Text dort nicht angezeigt werden. (Ein key für die Page ist z.b "home" oder "home.title" )

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

Die Sprache kann mit dem Componenten "LanguageSwitcher.js" umgestellt werden.

### Server Actions

Die Serverside Actions sind die Schnittstelle zwischen den Client Side Components (wie z.b. Formulare) und dem Supabase Backend. Sie breiten Datenbanekanfragen vor und schicken diese dann an das Backend. Die Antwort aus dem Backend wird dann ebenfalls hier verarbeitet und wieder an den Client zurück gegeben.

#### Authentifizeirungs Actions

**loginAction(formData)**
Authentifiziert einen Benutzer über Supabase mit Email und Passwort.
Bei Erfolg werden Authentifizierungstoken und zusätzliche Vereins- und Mitgliedsdaten in Cookies gespeichert und der Nutzer zum Dashboard weitergeleitet. Bei Fehler wird eine Fehlermeldung zurückgegeben.

**logoutAction()**
Meldet den Benutzer über Supabase ab und löscht die gespeicherten Session-Cookies.

**getLoginData(vereinName)**
Hilfsfunktion, die Mitglieds- und Vereinsdaten prüft und zurückgibt. Verifiziert, ob der Vereinsname mit dem im Member-Datensatz übereinstimmt.

#### Content Management Actions

**getSpecificContentAction(id)**

Lädt einen spezifischen Content-Eintrag anhand der Content-ID und der Vereins-ID aus Cookies. Autorisiert nur Vereinsmitglieder.

**updateContent(formData, template, contentID, author, tags, title)**

Aktualisiert einen bestehenden Content-Datensatz für den Verein anhand der übergebenen Parameter.

**createContent(formData, template, author, tags, title)**

Erstellt einen neuen Content-Eintrag für den Verein.

**loadAllContent()**

Lädt alle Content-Einträge für den Verein.

#### Styleguide Actions

**getStyleguideAction()**

Lädt den Styleguide des Vereins basierend auf der Vereins-ID aus den Cookies.

**saveStyleguideAction(formData)**

Aktualisiert den Styleguide des Vereins mit den neuen Werten aus dem Formular.

Nutzungshinweise:

- Alle serverseitigen Actions nutzen das Next.js cookies-API für Authentifizierung via Cookies.
- Supabase ist zentrale Datenbank- und Authentifizierungslösung.
