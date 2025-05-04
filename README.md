# THB_MUX

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

Wir werden das Projekt in Vercel deployen. Das ist noch auf der TO-DO liste

## Was ist Was

In diesem Abschitt sind Erklärungen zu den einzelen Codeteilen. Ziel ist es den einzelnen Teammitgliedern einen leichten Zugang zu der Arbeit mit Next.js zu geben und einen Überblick zu verschaffen.

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
