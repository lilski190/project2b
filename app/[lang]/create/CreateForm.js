"use client";

import { Toaster } from "react-hot-toast";
import { saveStyleguideAction } from "@/app/actions/styleguideAction";
import InformationTooltip from "@/components/tooltips/InformationTooltip";
import FileUpload from "@/components/input/fileUpload";
import TextField from "@/components/input/textField";
import TextArea from "@/components/input/textArea";
import RadioButton from "@/components/input/radioButton";
import Checkbox from "@/components/input/checkbox";
/**
 * Styleguide FORM Komponent
 */
export default function CreateForm({ dict, data }) {
  // let parsedData = JSON.parse(data);
  // console.log("data", parsedData);
  return (
    <form>
      <Toaster position="top-center" />
      <div className="">
        <div className="col-span-1 bg-base-200">
          <div className="flex justify-between w-full">
            <div className="lableText">Dummi headline</div>
            <InformationTooltip text="DUMMI TEXT" />
          </div>
          {data.types.map((typ, index) => {
            if (typ.type === "text") {
              return (
                <div key={index}>
                  This is a type text!
                  <div className="w-full">
                    <TextArea />
                  </div>
                </div>
              );
            } else if (typ.type === "image") {
              return (
                <div key={index}>
                  This is a type image!
                  <FileUpload />
                </div>
              );
            } else if (typ.type === "grafic") {
              return (
                <div key={index}>
                  This is a type grafic!
                  <Checkbox />
                </div>
              );
            } else if (typ.type === "headline") {
              return (
                <div key={index}>
                  This is a type headline!
                  <TextField />
                </div>
              );
            } else if (typ.type === "background") {
              return (
                <div key={index}>
                  This is a type background!
                  <RadioButton />
                </div>
              );
            } else if (typ.type === "color") {
              return (
                <div key={index}>
                  This is a type color!
                  <Checkbox />
                </div>
              );
            } else if (typ.type === "logo") {
              return (
                <div key={index}>
                  This is a type logo!
                  <RadioButton />
                </div>
              );
            } else if (typ.type === "gallery") {
              return (
                <div key={index}>
                  This is a type gallery!
                  <div className="grid grid-cols-3 gap-4">
                    <FileUpload />
                    <FileUpload />
                    <FileUpload />
                  </div>
                </div>
              );
            } else {
              return (
                <div key={typ.type + "_" + index}>
                  Type: {JSON.stringify(typ)}
                </div>
              );
            }
          })}
        </div>
      </div>
    </form>
  );
}
