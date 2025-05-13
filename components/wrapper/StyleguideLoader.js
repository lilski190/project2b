// app/dashboard/ClientDataLoader.tsx
"use client";

import { useEffect } from "react";
import { getStyleguideAction } from "@/app/actions/styleguideAction";

export default function StyleguideLoader({}) {
  useEffect(() => {
    console.log("StyleguideLoader useEffect");
    const fetchData = async () => {
      const data = await getStyleguideAction();
      if (data) localStorage.setItem("Styleguide", data);
    };

    fetchData();
  }, []);

  return null; // Kein UI notwendig, läuft im Hintergrund
}
