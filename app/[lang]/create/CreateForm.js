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
    <div className="">
      <div className="pb-3">
        <div className="px-3">
          <div className="flex justify-between w-full pb-1 ">
            <div className="lableText">{dict.form.title}</div>
            <InformationTooltip text={dict.formDescriptions.title} />
          </div>
          <input
            type="text"
            value={titleUpdate}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            placeholder={dict.form.title_placeholder}
          />
        </div>
        <div className="w-full  px-3 pt-3">
          <div className="flex justify-between w-full pb-1 ">
            <div className="lableText">{dict.form.tags_title}</div>
            <InformationTooltip text={dict.formDescriptions.tags} />
          </div>
          <div className="flex justify-start">
            <div className="dropdown mr-3">
              <div tabIndex={0} role="button" className="btn btn-outline">
                {dict.form.tags}
              </div>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 max-h-52">
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
            </div>
            <div className="">
              <div className="lableTextSmall flex">
                {tags.map((tag, index) => (
                  <div
                    key={tag + "_" + "index"}
                    className="border px-2 rounded mx-1 "
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  px-3 pt-3">
          <div className="flex justify-between w-full pb-1 ">
            <div className="lableText">{dict.form.authors}</div>
            <InformationTooltip text={dict.formDescriptions.authors} />
          </div>
          <div className="lableTextSmall flex -ml-1">
            {author.map((aut, index) => (
              <div
                key={aut + "_" + "index"}
                className="border px-2 rounded mx-1 "
              >
                {aut}
              </div>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="fixed p-3 pr-4 top-0 right-0 z-30">
          <button
            type="submit"
            className="btn btn-primary hover:bg-primary/70 transition-transform duration-300 hover:scale-105 font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            {dict.save}
          </button>
        </div>
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
        <div className="mx-3">
          <button
            type="submit"
            className=" w-full btn btn-primary hover:bg-primary/70 transition-transform duration-300 hover:scale-105 font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            {dict.save}
          </button>
        </div>
      </form>
    </div>
  );
}
