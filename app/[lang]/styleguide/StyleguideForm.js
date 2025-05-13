"use client";

import { Toaster } from "react-hot-toast";
import { saveStyleguideAction } from "@/app/actions/styleguideAction";
import InformationTooltip from "@/components/tooltips/InformationTooltip";
/**
 * Styleguide FORM Komponent
 */
export default function StyleguideForm({ dict }) {
  return (
    <form action={saveStyleguideAction}>
      <Toaster position="top-center" />
      <div className="grid grid-cols-2 max-md:grid-cols-1 ">
        <div className="col-span-1 bg-base-200">
          <p className="headline">{dict.styleguide.title}</p>
          <p className="baseText">{dict.styleguide.description}</p>

          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.colors}</div>
            <InformationTooltip text={dict.styleguide.infotext.colors} />
          </div>
          <div>COLOR COMPONENT</div>

          <div className="flex justify-between w-full">
            <div className="lableText">
              {dict.styleguide.headlines.backgrounds}
            </div>
            <InformationTooltip text={dict.styleguide.infotext.backgrounds} />
          </div>
          <div>Hintergründe COMPONENT</div>

          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.grafics}</div>
            <InformationTooltip text={dict.styleguide.infotext.grafics} />
          </div>
          <div>GraficElemente COMPONENT</div>
        </div>
        <div className="col-span-1 bg-base-300">
          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.logo}</div>
            <InformationTooltip text={dict.styleguide.infotext.logo} />
          </div>
          <div>logo COMPONENT</div>

          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.fonts}</div>
            <InformationTooltip text={dict.styleguide.infotext.fonts} />
          </div>
          <div>fonts COMPONENT</div>

          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.slogan}</div>
            <InformationTooltip text={dict.styleguide.infotext.slogan} />
          </div>
          <div>slogan COMPONENT</div>
        </div>
      </div>
    </form>
  );
}
