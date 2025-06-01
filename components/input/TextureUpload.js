"use client";

import React, { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient"; // Stelle sicher, dass du den Supabase-Client importierst

export default function TextureUpload({
  onFileUploaded,
  dict,
  fieldID,
  url,
  BASEURL,
  folderID,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [urlPath, setUrlPath] = useState(
    url ? url : "test/1748777334899_Bunker_01.jpg"
  ); // Setze einen Standardwert für den URL-Pfad

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
      .from("styles") // <-- passe den Bucket-Namen an
      .upload(filePath, selectedFile);

    console.log("Upload result:", data, error);
    if (data.path) {
      setUrlPath(data.path); // Setze den URL-Pfad für die Vorschau
    }
    setUploading(false);

    if (error) {
      console.error("Upload error:", error.message);
      alert("Fehler beim Hochladen.");
    } else {
      const { data: urlData } = supabase.storage
        .from("styles")
        .getPublicUrl(filePath);

      if (onFileUploaded) {
        onFileUploaded(urlData.publicUrl);
      }

      setModalOpen(false); // Modal schließen
      setSelectedFile(null); // Datei zurücksetzen
    }
  };

  return (
    <div>
      <div className="flex">
        <label
          htmlFor={fileID}
          className={`relative border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors w-20 h-20 ${
            dragActive ? "border-primary bg-primary/10" : "border-base-300"
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

          <Image
            src={
              baseURL + urlPath // Verwende den Basis-URL und den Pfad
            }
            fill
            alt={dict?.imgAlt || "Texture"}
            className="rounded-md"
          />
          <div className="relative w-full h-full flex justify-center items-center">
            <button
              type="button"
              className="btn bg-primary/70 border-none hover:bg-primary/100 w-12 h-6"
              onClick={() => document.getElementById(fileID)?.click()}
            >
              {dict?.buttonText || "Select"}
            </button>
          </div>
        </label>
      </div>
      {/* Modal */}
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
