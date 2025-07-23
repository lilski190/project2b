import React from "react";
import ColorPicker from "../input/colorPicker";
import InformationTooltipMini from "../tooltips/InformationTooltipMini";

/**
 * Colors Component
 *
 * Dieses Component rendert versteckte Input-Felder für Farbwerte.
 * Es werden vier Farbkategorien dargestellt: main, detail, text und neutral.
 * Jede Kategorie enthält zwei ColorPicker-Komponenten zur Auswahl von Farben.
 *
 * @param {Object} props - Die Eigenschaften des Components.
 * @param {Object} props.colors - Ein Objekt mit Farbwerten als Strings (z.B. Hexcodes).
 * @param {string} props.colors.main_01 - Hauptfarbe 1.
 * @param {string} props.colors.main_02 - Hauptfarbe 2.
 * @param {string} props.colors.detail_01 - Detailfarbe 1.
 * @param {string} props.colors.detail_02 - Detailfarbe 2.
 * @param {string} props.colors.text_01 - Textfarbe 1.
 * @param {string} props.colors.text_02 - Textfarbe 2.
 * @param {string} props.colors.neutral_01 - Neutrale Farbe 1.
 * @param {string} props.colors.neutral_02 - Neutrale Farbe 2.
 * @param {Object} props.dict - Ein Wörterbuch mit Bezeichnungen für die Farbgruppen.
 * @param {string} props.dict.main - Bezeichnung für die Hauptfarben-Gruppe.
 * @param {string} props.dict.detail - Bezeichnung für die Detailfarben-Gruppe.
 * @param {string} props.dict.text - Bezeichnung für die Textfarben-Gruppe.
 * @param {string} props.dict.neutral - Bezeichnung für die Neutralfarben-Gruppe.
 *
 * @returns {JSX.Element} Das gerenderte Colors Component.
 */
const Colors = ({ colors, dict }) => {
  return (
    <div className="grid grid-cols-2  gap-4 py-2 bg-neutral/30 rounded-md mt-1 px-2">
      <div className="flex flex-col items-center mt-2 justify-self-end">
        <div className="flex items-center">
          <div className="flex justify-between w-full py-2">
            <ColorPicker fieldID="main_01" ColorValue={colors.main_01} />
          </div>
          <div className="flex justify-between w-full p-2">
            <ColorPicker fieldID="main_02" ColorValue={colors.main_02} />
          </div>
        </div>
        <div className="lableTextSmall text-center">{dict.main}</div>
      </div>
      <div className="flex flex-col items-center mt-2 justify-self-start">
        <div className="flex items-center">
          <div className="flex justify-between w-full p-2">
            <ColorPicker fieldID="detail_01" ColorValue={colors.detail_01} />
          </div>
          <div className="flex justify-between w-full py-2">
            <ColorPicker fieldID="detail_02" ColorValue={colors.detail_02} />
          </div>
        </div>
        <div className="lableTextSmall text-center">{dict.detail}</div>
      </div>
      <div className="flex flex-col items-center mt-4 justify-self-end">
        <div className="flex items-center">
          <div className="flex justify-between w-full py-2">
            <ColorPicker fieldID="text_01" ColorValue={colors.text_01} />
          </div>
          <div className="flex justify-between w-full p-2">
            <ColorPicker fieldID="text_02" ColorValue={colors.text_02} />
          </div>
        </div>
        <div className="lableTextSmall text-center">{dict.text}</div>
      </div>
      <div className="flex flex-col items-center mt-4 justify-self-start">
        <div className="flex items-center">
          <div className="flex justify-between w-full p-2">
            <ColorPicker fieldID="neutral_01" ColorValue={colors.neutral_01} />
          </div>
          <div className="flex justify-between w-full py-2">
            <ColorPicker fieldID="neutral_02" ColorValue={colors.neutral_02} />
          </div>
        </div>
        <div className="lableTextSmall text-center">{dict.neutral}</div>
      </div>
    </div>
  );
};

export default Colors;
