"use client";

import React, { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

/**
 * TextureUpload-Komponente zum Hochladen und Anzeigen von Texturen.
 * Unterstützt Drag & Drop, Dateiauswahl und Upload mit Supabase Storage.
 *
 * @param {Object} props
 * @param {(url: string) => void} [props.onFileUploaded] - Callback mit der öffentlichen URL der hochgeladenen Datei.
 * @param {Object} [props.dict] - Übersetzungsobjekt für UI-Texte (z.B. buttonText, modalTitle).
 * @param {string} props.fieldID - ID und Name für Input-Elemente.
 * @param {string|boolean} props.url - Anfangs-URL der Datei oder false wenn keine.
 * @param {string} props.BASEURL - Basis-URL der Supabase Storage Instanz.
 * @param {string} props.folderID - Pfad/Ordner in Supabase Storage, in den hochgeladen wird.
 * @param {string} props.bucket - Bucket-Name im Supabase Storage.
 * @param {string} [props.imgAlt] - Alt-Text für das Bild.
 *
 * @returns {JSX.Element} Die Upload-Komponente mit Vorschau, Drag&Drop und modaler Bestätigung.
 */
export default function TextureUpload({
  onFileUploaded,
  dict,
  fieldID,
  url,
  BASEURL,
  folderID,
  bucket,
  imgAlt,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [urlPath, setUrlPath] = useState(url !== false ? url : false);

  let baseURL = BASEURL + bucket + "/";

  let fileID = "file-upload-" + fieldID || "file-upload";

  const handleFile = (fileList) => {
    if (fileList && fileList[0]) {
      const file = fileList[0];
      setSelectedFile(file);
      setModalOpen(true);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFile(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    handleFile(e.target.files);
  };

  const uploadFile = async () => {
    if (!selectedFile) return;
    setUploading(true);

    const filePath = `${folderID}/${Date.now()}_${selectedFile.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, selectedFile);
    if (data.path) {
      setUrlPath(data.path);
    }
    setUploading(false);

    if (error) {
      console.error("Upload error:", error.message);
      alert("Fehler beim Hochladen.");
    } else {
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      if (onFileUploaded) {
        onFileUploaded(urlData.publicUrl);
      }

      setModalOpen(false);
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <label
          htmlFor={fileID}
          className={`relative  rounded-md p-6 text-center cursor-pointer transition-colors w-20 h-20
             cursor-pointer transition-all duration-200 ease-in-out hover:scale-115 
             hover:shadow-md hover:border-info hover:bg-info/10 hover:border-3 ${
               dragActive ? "border-dashed border-info bg-info/10 border-4" : ""
             }`}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id={fileID}
            type="file"
            accept="*"
            onChange={handleChange}
            className="hidden"
          />
          <input
            id={fileID}
            name={fieldID}
            value={urlPath}
            className="hidden"
            readOnly
          />

          {!urlPath || url == false ? (
            <Image
              src={BASEURL + "basic/illustration/FileUpload.jpg"}
              fill
              alt={imgAlt || "File Upload"}
              className={`rounded-sm ${dragActive ? "opacity-40" : ""}`}
            />
          ) : (
            <Image
              src={baseURL + urlPath}
              fill
              alt={imgAlt || "Texture"}
              className={`rounded-sm ${dragActive ? "opacity-40" : ""}`}
            />
          )}
        </label>
        <div className="relative w-full flex justify-end items-end mt-3">
          <button
            type="button"
            className="btn btn-info btn-soft py-0.5 border-none  lableTextSmall text-center w-full h-full rounded-sm"
            onClick={() => document.getElementById(fileID)?.click()}
          >
            {dict?.buttonText || "Select"}
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {dict?.modalTitle || "Datei hochladen"}
            </h2>
            {selectedFile && (
              <div className="mb-4">
                <p className="text-sm">
                  {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)}{" "}
                  KB)
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-ghost"
              >
                Abbrechen
              </button>
              <button
                onClick={uploadFile}
                className="btn btn-primary"
                disabled={uploading}
              >
                {uploading ? "Lade hoch..." : "Speichern"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
