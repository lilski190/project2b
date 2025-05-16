"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function FileUpload({ onFileSelected, dict }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (fileList) => {
    if (fileList && fileList[0]) {
      const file = fileList[0];
      setSelectedFile(file);
      if (onFileSelected) {
        onFileSelected(file);
      }
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

  return (
    <div>
      <div className="flex">
        <label
          htmlFor="file-upload"
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors w-full ${
            dragActive ? "border-primary bg-primary/10" : "border-base-300"
          }`}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="file-upload"
            type="file"
            accept="*"
            onChange={handleChange}
            className="hidden"
          />
          <p className="mb-2">
            {/* <img
              src="/freepik\dark_black.jpg"
              alt={dict ? dict.imgAlt : "Illustration für Drag und Drop"}
            /> */}
            TODO: DEBUG WHY IMAGE IS NOT LOADED!
            <Image
              src="/freepik/illustrations/FileUpload.jpg"
              alt={dict ? dict.imgAlt : "Illustration für Drag und Drop"}
              width={100}
              height={50}
            />
          </p>
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            {dict ? dict.buttonText : "Datei auswählen"}
          </button>
        </label>
      </div>

      {selectedFile && (
        <div className="mt-4 text-sm">
          <h2 className="font-semibold">
            {dict ? dict.ChoosenFile : " Ausgewählte Datei:"}
          </h2>
          <p>
            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
          </p>
        </div>
      )}
    </div>
  );
}
