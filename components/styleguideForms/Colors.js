import React from "react";
import ColorPicker from "../input/colorPicker";
import InformationTooltipMini from "../tooltips/InformationTooltipMini";

/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
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
