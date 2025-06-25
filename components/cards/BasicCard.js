import React from "react";
import Link from "next/link";
import { BASEURL } from "@/lib/globals";

/**
 * BasicCard Komponent
 * Dieser Komponent ist ein einfacher Button, der in verschiedenen Themen verwendet werden kann.
 * Es basiert auf dem Tailwind CSS-Framework und Daisy UI für das Styling.
 * Der Button kann mit verschiedenen Text- und Farbklassen angepasst werden.
 * @param {string} text - Der anzuzeigende Text auf dem Button.
 * @param {string} colorClass - Die Farbklasse, die auf den Button angewendet werden soll.
 */
const BasicCard = ({ title, text, action, img }) => {
  return (
    <div className="card bg-base-100 w-full shadow-sm h-full">
      <figure>
        <img
          src={BASEURL + (img ? img : "basic/illustration/Image.jpg")}
          alt="Preview Image for Card"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title ? title : "Card Title"}</h2>
        <p>{text ? text : "A card component has a figure, a body"}</p>
        <div className="card-actions justify-end">
          <Link
            href={{
              pathname: action ? action.url : "/create",
              query: {
                [action?.parameter?.[0]]: action?.parameter?.[1],
                content: "0",
              },
            }}
          >
            <button className="btn btn-primary">
              {action ? action.text : "Button"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BasicCard;
