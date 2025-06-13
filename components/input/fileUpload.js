"use client";

import React, { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function FileUpload({
  onFileUploaded,
  dict,
  fieldID,
  url,
  BASEURL,
  folderID,
  bucket,
  onChange,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [urlPath, setUrlPath] = useState(
    url ? url : "test/1748777334899_Bunker_01.jpg"
  );
  const [uploaded, setUploaded] = useState(false);

  let baseURL = BASEURL;

  let fileID = "file-upload-" + fieldID || "file-upload";

  const handleFile = (fileList) => {
    if (fileList && fileList[0]) {
      const file = fileList[0];
      setSelectedFile(file);
      setModalOpen(true); // Modal öffnen
    }
  };

  const handleDrag = (e) => {
    console.log("DRAG CTIVE");
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
    console.log("Uploading file to:", filePath);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, selectedFile);

    console.log("Upload result:", data, error);
    if (data.path) {
      setUrlPath(data.path);
    }
    setUploading(false);
    setUploaded(true);

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

      if (onChange) {
        onChange(urlData.publicUrl);
      }
      setModalOpen(false); // Modal schließen
      setSelectedFile(null); // Datei zurücksetzen
    }
  };

  return (
    <div className=" p-3  ">
      <div className="flex justify-center">
        <label
          htmlFor="file-upload"
          className={` bg-white h-48 relative border-2 border-dashed rounded-md text-center cursor-pointer transition-colors w-1/2 ${
            dragActive ? "" : "border-base-300"
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

          <div className=" flex justify-center w-full h-full z-0 opacity-80 rounded-md">
            {uploaded ? (
              <Image
                src={
                  baseURL + urlPath // Verwende den Basis-URL und den Pfad
                }
                fill
                alt={dict?.imgAlt || "Texture"}
                className="rounded-md"
              />
            ) : (
              <Image
                src="https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/basic/illustration/FileUpload.jpg"
                fill
                alt={dict?.imgAlt || "Texture"}
                className="rounded-md"
              />
            )}
          </div>
          {dragActive && (
            <div className="absolute inset-0 z-10 bg-primary/10 border-2 border-primary border-dashed rounded-md pointer-events-none"></div>
          )}

          <div className="-mt-12 w-full  flex justify-center items-end">
            <button
              type="button"
              className=" btn btn-primary z-20 mb-5"
              onClick={() => document.getElementById(fileID)?.click()}
            >
              {dict ? dict.buttonText : "Datei auswählen"}
            </button>
          </div>
        </label>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg ">
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
