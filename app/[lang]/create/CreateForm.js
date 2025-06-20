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
import TextLayerComponent from "@/components/createForms/TextLayerComponent";
import LogoComponent from "@/components/createForms/LogoComponent";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
/**
 * Styleguide FORM Komponent
 */
export default function CreateForm({
  dict,
  data,
  template,
  contentID,
  vereinID,
  VereinTags,
  selectedTags,
  author,
  title,
}) {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState("");

  const router = useRouter();

  const [tags, setTags] = useState(selectedTags);
  const [titleUpdate, setTitle] = useState(title);

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
        result = await createContent(
          storage,
          template,
          author,
          tags,
          titleUpdate
        );
      } else {
        result = await updateContent(
          storage,
          template,
          contentID,
          author,
          tags,
          titleUpdate
        );
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

  let baseUrl =
    "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/content/";

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

  const handleCheckboxChange = (tag) => {
    setTags(
      (prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag) // remove if already selected
          : [...prevTags, tag] // add if not selected
    );
  };

  return (
    <div>
      <div>
        <div>
          TITLE:
          <input
            type="text"
            value={titleUpdate}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Titel eingeben"
          />
        </div>
        <div className="w-full max-w-xs">
          <details className="dropdown">
            <summary className="m-1 btn btn-outline">Tags auswählen</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              {JSON.parse(VereinTags).map((tag, index) => (
                <li key={`tag_${index}`}>
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={tags.includes(tag)}
                      onChange={() => handleCheckboxChange(tag)}
                      className="checkbox checkbox-info checkbox-sm"
                    />
                    <span>{tag}</span>
                  </label>
                </li>
              ))}
            </ul>
          </details>

          <div className="mt-4">
            Selected Tags:
            <div className="text-sm">{tags.join(", ") || "Keine"}</div>
          </div>
        </div>
        <div>AUTHORS: {author}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-primary">
          Save Data
        </button>

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
                  <div key={index} className="p-3">
                    TEXT
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
                    <FileUpload
                      BASEURL={baseUrl}
                      folderID={vereinID}
                      bucket="content"
                      url={
                        typ.value ||
                        "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/basic/illustration/FileUpload.jpg"
                      }
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
                  <div key={index} className="p-3">
                    HEADLINE
                    <TextField
                      fieldID="headline_test"
                      Textvalue={typ.value || ""}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                  </div>
                );
              } else if (typ.type === "textLayer") {
                return (
                  <div key={index}>
                    This is a type textLayer!
                    <TextField
                      fieldID="textLayerField"
                      Textvalue={typ.textValue || ""}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                  </div>
                );
              } else if (typ.type === "background") {
                return (
                  <div key={index}>
                    This is a type background! {typ.options}{" "}
                    {JSON.stringify(typ)}
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
                    LOGO
                    <LogoComponent
                      fieldID="logo_rafio"
                      Textvalue={typ.value || ""}
                      onChange={(e) => handleChange(index, e.target.value)}
                      options={typ.options}
                    />
                    LOGO END:
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
                      fieldID={"layer_" + index}
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
    </div>
  );
}
