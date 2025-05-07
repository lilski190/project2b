## 📘 JSDoc Cheatsheet

Erstellt von Chatgpt am 04.05.25

### 🔹 Allgemeine Syntax

```js
/**
 * Beschreibung.
 * @tag {Typ} name - Erklärung
 */
```

---

### 🔹 Funktionen

```js
/**
 * Addiert zwei Zahlen.
 * @param {number} a - Erste Zahl.
 * @param {number} b - Zweite Zahl.
 * @returns {number} Die Summe.
 */
function add(a, b) {
  return a + b;
}
```

---

### 🔹 Variablen / Konstanten

```js
/** @type {string} */
const username = "Lili";

/**
 * @type {{ id: number, name: string }}
 */
const user = { id: 1, name: "Lili" };
```

---

### 🔹 Klassen und Methoden

```js
/**
 * Benutzerklasse.
 */
class User {
  /**
   * Erstellt einen Benutzer.
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Gibt den Namen zurück.
   * @returns {string}
   */
  getName() {
    return this.name;
  }
}
```

---

### 🔹 Eigene Typdefinitionen (`@typedef`, `@property`)

```js
/**
 * @typedef {Object} Product
 * @property {number} id - Die Produkt-ID.
 * @property {string} name - Der Name.
 */

/** @type {Product} */
const book = { id: 1, name: "JS Guide" };
```

---

### 🔹 Asynchrone Funktionen

```js
/**
 * Lädt Daten vom Server.
 * @async
 * @returns {Promise<Object>}
 */
async function fetchData() {
  return await fetch("/api").then((res) => res.json());
}
```

---

### 🔹 Beispielcode (`@example`)

```js
/**
 * Multipliziert zwei Zahlen.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @example
 * multiply(2, 3); // 6
 */
function multiply(a, b) {
  return a * b;
}
```

---

### 🔹 Weitere nützliche Tags

| Tag            | Beschreibung                        |
| -------------- | ----------------------------------- |
| `@param`       | Funktionsparameter                  |
| `@returns`     | Rückgabewert der Funktion           |
| `@type`        | Typ einer Variablen                 |
| `@typedef`     | Eigener Objekttyp                   |
| `@property`    | Feld innerhalb eines `@typedef`     |
| `@constructor` | Konstruktor markieren               |
| `@class`       | Klasse markieren                    |
| `@example`     | Beispielcode zeigen                 |
| `@async`       | Markiert eine async-Funktion        |
| `@deprecated`  | Markiert veralteten Code            |
| `@throws`      | Was eine Funktion an Fehlern wirft  |
| `@see`         | Verweis auf verwandte Informationen |
| `@default`     | Standardwert eines Parameters       |
