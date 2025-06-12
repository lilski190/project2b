"use client";

import { Toaster } from "react-hot-toast";
import { updateContent, createContent } from "@/app/actions/contentAction";
import InformationTooltip from "@/components/tooltips/InformationTooltip";
import FileUpload from "@/components/input/fileUpload";
import TextField from "@/components/input/textField";
import TextArea from "@/components/input/textArea";
import RadioButton from "@/components/input/radioButton";
import Checkbox from "@/components/input/checkbox";
import LayerComponent from "@/components/createForms/LayerComponent";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
/**
 * Styleguide FORM Komponent
 */
export default function CreateForm({ dict, data, template, contentID }) {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState("");

  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("CreateForm", JSON.stringify(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    let storage = JSON.parse(localStorage.getItem("CreateForm"));
    let result = null;
    try {
      if (contentID === "0" || contentID === undefined) {
        console.log("Creating new content with template:", template);
        result = await createContent(storage, template);
      } else {
        result = await updateContent(storage, template, contentID);
      }
      console.log("Submit result:", result);
      const neueId = result?.data?.[0]?.id;
      if (neueId) {
        console.log("refresh page");
        router.push(`/create?template=${template}&content=${neueId}`);
      }

      // TODO: result.data[0].id in url papram unter content ersetzen
      //TODO: setLoaded modal mit der richitgen nachricht ausgeben!
    } catch (error) {
      console.error("Fehler beim Submit:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (index, e) => {
    console.log("handleChange called with index:", index, "and value:", e);
    let storage = JSON.parse(localStorage.getItem("CreateForm"));
    let currentData = storage.types;
    console.log("Current localStorage data:", currentData);
    if (!currentData) {
      console.log("No data found in localStorage, initializing currentData.");
      currentData = {};
    } else {
      currentData[index].value = e;
    }

    storage.types = currentData;

    localStorage.setItem("CreateForm", JSON.stringify(storage));
    window.dispatchEvent(new Event("createform-updated"));
    console.log("Updated localStorage with data:", storage);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="btn btn-primary">
        Save Data
      </button>

      {contentID}
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
                    <TextArea
                      fieldID="text_test"
                      Textvalue={typ.value || ""}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                  </div>
                </div>
              );
            } else if (typ.type === "image") {
              return (
                <div key={index}>
                  This is a type image!
                  <FileUpload
                    BASEURL="https://example.com/upload"
                    folderID="TODO"
                    bucket="styles"
                    url={typ.value || ""}
                    onChange={(newValue) => handleChange(index, newValue)}
                  />
                </div>
              );
            } else if (typ.type === "grafic") {
              return (
                <div key={index}>
                  This is a type grafic!
                  <Checkbox
                    fieldID="grafic_checkbox"
                    Textvalue={typ.value || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </div>
              );
            } else if (typ.type === "headline") {
              return (
                <div key={index}>
                  This is a type headline!
                  <TextField
                    fieldID="headline_test"
                    Textvalue={typ.value || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </div>
              );
            } else if (typ.type === "background") {
              return (
                <div key={index}>
                  This is a type background! {typ.options} {JSON.stringify(typ)}
                  <RadioButton
                    fieldID="background_checkbox"
                    Textvalue={typ.value || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    options={typ.options}
                  />
                </div>
              );
            } else if (typ.type === "color") {
              return (
                <div key={index}>
                  This is a type color!
                  <Checkbox
                    fieldID="color_checkbox"
                    Textvalue={typ.value || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </div>
              );
            } else if (typ.type === "logo") {
              return (
                <div key={index}>
                  This is a type logo!
                  <RadioButton
                    fieldID="logo_rafio"
                    Textvalue={typ.value || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    options={typ.options}
                  />
                </div>
              );
            } else if (typ.type === "gallery") {
              return (
                <div key={index}>
                  This is a type gallery!
                  <div className="grid grid-cols-3 gap-4">
                    <FileUpload
                      BASEURL="https://example.com/upload"
                      folderID="TODO"
                      bucket="styles"
                      url={typ.value || ""}
                      onChange={(newValue) => handleChange(index, newValue)}
                    />
                    <FileUpload
                      BASEURL="https://example.com/upload"
                      folderID="TODO"
                      bucket="styles"
                      url={typ.value || ""}
                      onChange={(newValue) => handleChange(index, newValue)}
                    />
                    <FileUpload
                      BASEURL="https://example.com/upload"
                      folderID="TODO"
                      bucket="styles"
                      url={typ.value || ""}
                      onChange={(newValue) => handleChange(index, newValue)}
                    />
                  </div>
                </div>
              );
            } else if (typ.type === "layer") {
              return (
                <div key={typ.type + "_" + index}>
                  <LayerComponent
                    fieldID="text_layer"
                    Textvalue={typ.value || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    options={typ.options}
                  />
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
