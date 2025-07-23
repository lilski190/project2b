"use client";

import { useEffect } from "react";
import { getStyleguideAction } from "@/app/actions/styleguideAction";

/**
 * React-Komponente, die beim ersten Rendern automatisch Styleguide-Daten lädt.
 *
 * Diese Komponente führt beim Mounten einen `getStyleguideAction`-Call aus,
 * speichert die empfangenen Daten (sofern vorhanden) als JSON-String im `localStorage`
 * unter dem Schlüssel `"Styleguide"` und gibt selbst kein sichtbares UI-Element zurück.
 *
 * @function StyleguideLoader
 * @returns {null} Gibt `null` zurück, da keine UI-Komponente gerendert wird.
 *
 * @example
 * <StyleguideLoader />
 */
export default function StyleguideLoader({}) {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStyleguideAction();
      console.log("StyleguideLoader fetched data:", data.stringify);
      if (data) localStorage.setItem("Styleguide", data.stringify);
    };

    fetchData();
  }, []);

  return null;
}
