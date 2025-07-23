"use client";

import { Toaster } from "react-hot-toast";
import { loginAction } from "@/app/actions/authAction";
import { useState } from "react";
import { VEREINE } from "@/lib/globals";

/**
 * LoginForm Komponente
 *
 * Ein einfaches Login-Formular mit Verein-Auswahl, Email- und Passwort-Feldern.
 * Verwendet Tailwind CSS und DaisyUI für das Styling.
 * Sendet die Formular-Daten via loginAction zur Authentifizierung.
 *
 * @param {Object} props
 * @param {Object} props.dict - Wörterbuch-Objekt für Übersetzungen.
 * @param {Object} props.dict.login - Übersetzungen für Login.
 * @param {string} props.dict.login.login - Text für den Login-Button.
 *
 * @returns {JSX.Element} Das gerenderte Login-Formular.
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
              <option value={verein} key={"Verein_" + index}>
                {verein}
              </option>
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
