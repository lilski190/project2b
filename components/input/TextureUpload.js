"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function TextureUpload({ onFileSelected, dict, data, FieldID }) {
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
          className={`relative border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors w-20 h-20 ${
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

          <Image
            src={
              data
                ? data.image
                : "https://i0.wp.com/texturefabrik.com/wp-content/uploads/2020/09/texture_fabrik_cyan_textures_01.jpg?ssl=1"
            }
            fill={true}
            alt={dict ? dict.imgAlt : "Texture"}
            className="rounded-md"
          />

          <div className="relative w-full h-full flex justify-center items-center">
            <button
              type="button"
              className=" btn bg-primary/70 border-none hover:bg-primary/100   w-12 h-6"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {dict ? dict.buttonText : "Select"}
            </button>
          </div>
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
