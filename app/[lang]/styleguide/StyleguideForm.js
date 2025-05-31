"use client";

import { Toaster } from "react-hot-toast";
import { saveStyleguideAction } from "@/app/actions/styleguideAction";
import InformationTooltip from "@/components/tooltips/InformationTooltip";
import Colors from "@/components/styleguideForms/Colors";
import Backgrounds from "@/components/styleguideForms/Backgrounds";
import FontSelectors from "@/components/styleguideForms/FontSelectors";
import Logos from "@/components/styleguideForms/Logos";
import Slogan from "@/components/styleguideForms/Slogan";
import Grafics from "@/components/styleguideForms/Grafics";
/**
 * Styleguide FORM Komponent
 */
export default function StyleguideForm({ dict, data }) {
  let parsedDataObj = JSON.parse(data);
  console.log("data", parsedDataObj[0]);
  let parsedData = parsedDataObj[0];

  return (
    <form action={saveStyleguideAction}>
      <button type="submit" className="btn btn-primary">
        Save Data
      </button>
      <Toaster position="top-center" />
      <div className="grid grid-cols-2 max-md:grid-cols-1 ">
        <div className="col-span-1 bg-base-200">
          <p className="headline">{dict.styleguide.title}</p>
          <p className="baseText">{dict.styleguide.description}</p>

          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.colors}</div>
            <InformationTooltip text={dict.styleguide.infotext.colors} />
          </div>
          <Colors
            colors={parsedData.colors}
            dict={dict.styleguide.colorDescription}
          />

          <div className="flex justify-between w-full">
            <div className="lableText">
              {dict.styleguide.headlines.backgrounds}
            </div>
            <InformationTooltip text={dict.styleguide.infotext.backgrounds} />
          </div>
          <Backgrounds dict={dict.styleguide.colorDescription} />

          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.grafics}</div>
            <InformationTooltip text={dict.styleguide.infotext.grafics} />
          </div>
          <Grafics />
        </div>
        <div className="col-span-1 bg-base-300">
          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.logo}</div>
            <InformationTooltip text={dict.styleguide.infotext.logo} />
          </div>
          <Logos dict={dict.styleguide.colorDescription} />

          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.fonts}</div>
            <InformationTooltip text={dict.styleguide.infotext.fonts} />
          </div>
          <FontSelectors fonts={parsedData.fonts} />

          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.slogan}</div>
            <InformationTooltip text={dict.styleguide.infotext.slogan} />
          </div>
          <Slogan />
        </div>
      </div>
    </form>
  );
}
