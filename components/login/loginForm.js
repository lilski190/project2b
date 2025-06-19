"use client";

import { Toaster } from "react-hot-toast";
import { loginAction } from "@/app/actions/authAction";
import { useState } from "react";
import { VEREINE } from "@/lib/globals";

/**
 * LoginForm Komponent
 * Dieser Komponent ist ein einfaches Login-Formular, das in verschiedenen Themen verwendet werden kann.
 * Er enthält Eingabefelder für E-Mail und Passwort sowie einen Button zum Einloggen.
 * Das Styling erfolgt über Tailwind CSS-Klassen und DaisyUI-Klassen.
 * Die Login-Action wird über die Funktion loginAction aufgerufen, die in der Datei app/actions/authAction.js definiert ist.s
 * @param {Object} dict - Das Wörterbuch-Objekt, das die Übersetzungen für die verschiedenen Sprachen enthält.
 */
export default function LoginForm({ dict }) {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <>
      <Toaster position="top-center" />
      <form action={loginAction} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Verein</label>
          <input
            type="text"
            name="verein"
            value={selectedValue}
            readOnly
            hidden
          />
          <select
            className="select"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            required
          >
            <option value="" disabled>
              Pick a Verein
            </option>
            {VEREINE.map((verein, index) => (
              <option value={verein}>{verein}</option>
            ))}
          </select>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            required
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            required
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-neutral mt-4">
            {dict.login.login}
          </button>
        </fieldset>
      </form>
    </>
  );
}
