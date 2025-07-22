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
import InformationTooltipRight from "@/components/tooltips/InformationTooltipRight";
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
  duplicate,
}) {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState("");
  const router = useRouter();
  const [openIndexes, setOpenIndexes] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const [tags, setTags] = useState(selectedTags);
  const [titleUpdate, setTitle] = useState(title);

  useEffect(() => {
    localStorage.setItem("CreateForm", JSON.stringify(data));
  });

  const toggleAccordion = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleSingleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    let storage = JSON.parse(localStorage.getItem("CreateForm"));
    let result = null;
    try {
      if (contentID === "0" || contentID === undefined || duplicate) {
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

  const handleChange = async (index, value, imageIndex = null) => {
    let storage = JSON.parse(localStorage.getItem("CreateForm")) || {};
    let currentData = storage.types;

    if (!currentData || !currentData[index]) return;

    if (currentData[index].type === "gallery" && imageIndex !== null) {
      // Stelle sicher, dass value ein Array ist
      if (!Array.isArray(currentData[index].value)) {
        currentData[index].value = [];
      }
      currentData[index].value[imageIndex] = value;
    } else {
      currentData[index].value = value;
    }

    storage.types = currentData;
    localStorage.setItem("CreateForm", JSON.stringify(storage));
    window.dispatchEvent(new Event("createform-updated"));
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
      <div className="">
        <div
          className={`collapse collapse-arrow z-0 bg-base-100 border border-base-300 ${
            openIndex === 0 ? "collapse-open" : ""
          }`}
        >
          <div
            className="collapse-title font-semibold cursor-pointer hover:bg-white/10"
            onClick={() => toggleSingleAccordion(0)}
          >
            {dict.lables.generell}
          </div>
          <div className="collapse-content text-sm">
            <div className="">
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
            <div className="w-full pt-3">
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
                      <li key={`tag_${index}_${index}`}>
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
            <div className="w-full  pt-3">
              <div className="flex justify-between w-full pb-1 ">
                <div className="lableText">{dict.form.authors}</div>
                <InformationTooltip text={dict.formDescriptions.authors} />
              </div>
              <div className="lableTextSmall flex -ml-1">
                {author.map((aut, index) => (
                  <div
                    key={aut + "_" + "index_" + index}
                    className="border px-2 rounded mx-1 "
                  >
                    {aut}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="fixed p-3 pr-4 top-0 right-0 z-50">
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
            {data.types.map((typ, index) => {
              if (typ.type === "text") {
                return (
                  <div
                    key={index}
                    className={`collapse collapse-arrow z-0 bg-base-100 border border-base-300 ${
                      openIndexes.includes(index) ? "collapse-open" : ""
                    }`}
                  >
                    <div
                      className="collapse-title font-semibold cursor-pointer hover:bg-white/10 "
                      onClick={() => toggleAccordion(index)}
                    >
                      <div className="flex items-start">
                        <div className=""> {dict.lables[typ.lable]} </div>
                      </div>
                    </div>
                    <div className="collapse-content text-sm">
                      <div className="w-full">
                        <TextArea
                          fieldID="text_test"
                          Textvalue={typ.value || ""}
                          onChange={(e) => handleChange(index, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else if (typ.type === "image") {
                return (
                  <div
                    key={index}
                    className={`collapse collapse-arrow z-0 bg-base-100 border border-base-300 ${
                      openIndexes.includes(index) ? "collapse-open" : ""
                    }`}
                  >
                    <div
                      className="collapse-title font-semibold cursor-pointer hover:bg-white/10"
                      onClick={() => toggleAccordion(index)}
                    >
                      {dict.lables[typ.lable]}
                    </div>
                    <div className="collapse-content text-sm">
                      <div className="w-full">
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
                    </div>
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
                  <div
                    key={index}
                    className={`collapse collapse-arrow z-0 bg-base-100 border border-base-300 ${
                      openIndexes.includes(index) ? "collapse-open" : ""
                    }`}
                  >
                    <div
                      className="collapse-title font-semibold cursor-pointer hover:bg-white/10"
                      onClick={() => toggleAccordion(index)}
                    >
                      {dict.lables[typ.lable]}
                    </div>
                    <div className="collapse-content text-sm">
                      <div className="w-full">
                        <TextField
                          fieldID="headline_test"
                          Textvalue={typ.value || ""}
                          onChange={(e) => handleChange(index, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else if (typ.type === "textLayer") {
                return (
                  <div
                    key={index}
                    className={`collapse collapse-arrow z-0 bg-base-100 border border-base-300 ${
                      openIndexes.includes(index) ? "collapse-open" : ""
                    }`}
                  >
                    <div
                      className="collapse-title font-semibold cursor-pointer hover:bg-white/10"
                      onClick={() => toggleAccordion(index)}
                    >
                      {dict.lables[typ.lable]}
                    </div>
                    <div className="collapse-content text-sm">
                      <div className="w-full">
                        <TextField
                          fieldID="textLayerField"
                          Textvalue={typ.textValue || ""}
                          onChange={(e) => handleChange(index, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else if (typ.type === "background") {
                return (
                  <div
                    key={index}
                    className={`collapse collapse-arrow z-0 bg-base-100 border border-base-300 ${
                      openIndexes.includes(index) ? "collapse-open" : ""
                    }`}
                  >
                    <div
                      className="collapse-title font-semibold cursor-pointer hover:bg-white/10"
                      onClick={() => toggleAccordion(index)}
                    >
                      {dict.lables[typ.lable]}
                    </div>
                    <div className="collapse-content text-sm">
                      <div className="w-full">
                        <RadioButton
                          fieldID="background_checkbox"
                          Textvalue={typ.value || ""}
                          onChange={(e) => handleChange(index, e.target.value)}
                          options={typ.options}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else if (typ.type === "color") {
                return (
                  <div
                    key={index}
                    className={`collapse collapse-arrow z-0 bg-base-100 border border-base-300 ${
                      openIndexes.includes(index) ? "collapse-open" : ""
                    }`}
                  >
                    <div
                      className="collapse-title font-semibold cursor-pointer hover:bg-white/10"
                      onClick={() => toggleAccordion(index)}
                    >
                      {dict.lables[typ.lable]}
                    </div>
                    <div className="collapse-content text-sm">
                      <div className="w-full">
                        <Checkbox
                          fieldID="color_checkbox"
                          Textvalue={typ.value || ""}
                          onChange={(e) => handleChange(index, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else if (typ.type === "logo") {
                return (
                  <div
                    key={index}
                    className={`collapse collapse-arrow z-0 bg-base-100 border border-base-300 ${
                      openIndexes.includes(index) ? "collapse-open" : ""
                    }`}
                  >
                    <div
                      className="collapse-title font-semibold cursor-pointer hover:bg-white/10"
                      onClick={() => toggleAccordion(index)}
                    >
                      {dict.lables[typ.lable]}
                    </div>
                    <div className="collapse-content text-sm">
                      <div className="w-full">
                        <LogoComponent
                          fieldID="logo_rafio"
                          Textvalue={typ.value || ""}
                          onChange={(e) => handleChange(index, e.target.value)}
                          options={typ.options}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else if (typ.type === "gallery") {
                return (
                  <div
                    key={index}
                    className={`collapse collapse-arrow z-0 bg-base-100 border border-base-300 ${
                      openIndexes.includes(index) ? "collapse-open" : ""
                    }`}
                  >
                    <div
                      className="collapse-title font-semibold cursor-pointer hover:bg-white/10"
                      onClick={() => toggleAccordion(index)}
                    >
                      {dict.lables[typ.lable]}
                    </div>
                    <div className="collapse-content text-sm">
                      <div className="w-full ">
                        <FileUpload
                          BASEURL={baseUrl}
                          folderID={vereinID}
                          fieldID={"gallery_01"}
                          bucket="content"
                          url={
                            typ.value ||
                            "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/basic/illustration/FileUpload.jpg"
                          }
                          onChange={(newValue) =>
                            handleChange(index, newValue, 0)
                          }
                        />
                        <FileUpload
                          BASEURL={baseUrl}
                          folderID={vereinID}
                          bucket="content"
                          fieldID={"gallery_02"}
                          url={
                            typ.value ||
                            "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/basic/illustration/FileUpload.jpg"
                          }
                          onChange={(newValue) =>
                            handleChange(index, newValue, 1)
                          }
                        />
                        <FileUpload
                          BASEURL={baseUrl}
                          folderID={vereinID}
                          bucket="content"
                          fieldID={"gallery_03"}
                          url={
                            typ.value ||
                            "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/basic/illustration/FileUpload.jpg"
                          }
                          onChange={(newValue) =>
                            handleChange(index, newValue, 2)
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              } else if (typ.type === "layer") {
                return (
                  <div
                    key={index}
                    className={`collapse collapse-arrow z-0 bg-base-100 border border-base-300 ${
                      openIndexes.includes(index) ? "collapse-open" : ""
                    }`}
                  >
                    <div
                      className="collapse-title font-semibold cursor-pointer hover:bg-white/10"
                      onClick={() => toggleAccordion(index)}
                    >
                      {dict.lables[typ.lable]}
                    </div>
                    <div className="collapse-content text-sm">
                      <div className="w-full">
                        <LayerComponent
                          fieldID={"layer_" + index}
                          Textvalue={typ.value || ""}
                          onChange={(e) => handleChange(index, e.target.value)}
                          options={typ.options}
                        />
                      </div>
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
        <div className="p-6 bg-base-100">
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
