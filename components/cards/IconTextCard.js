import React from "react";
import Link from "next/link";
import { ICONS } from "@/lib/globals";

/**
 * IconTextCard Komponent
 * Dieser Komponent ist ein einfacher Button, der in verschiedenen Themen verwendet werden kann.
 * Es basiert auf dem Tailwind CSS-Framework und Daisy UI für das Styling.
 * Der Button kann mit verschiedenen Text- und Farbklassen angepasst werden.
 * @param {string} text - Der anzuzeigende Text auf dem Button.
 * @param {string} colorClass - Die Farbklasse, die auf den Button angewendet werden soll.
 */
const IconTextCard = ({ title, text, action, icon }) => {
  return (
    <div className="w-full transition-transform duration-300 hover:scale-105 hover:opacity-90 rounded-xl cursor-pointer h-full">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="my-5 p-3  bg-base-100 rounded-full  transition-transform duration-300  hover:rotate-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="max-md:size-11 size-13"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={ICONS[icon]}
            />
          </svg>
        </div>

        <div className="bg-base-100 w-full p-5 -mt-15 -z-10 h-full rounded-md">
          <div className="mt-10 rounded-md flex flex-col items-center h-2/3 pb-3">
            <div className="card-title text-center mt-2">{title}</div>
            <div className="max-sm:hidden w-3/4 my-3 text-center">{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconTextCard;
