'use client'

import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";

const KtpDetector = ({ placeholder = "Upload Your KTP", onChange }) => {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const LABEL_NIK = "NIK :";

  const handleFileUpload = async (event) => {
    const target = event.target;
    const file = target.files ? target.files[0] : undefined;

    if (file) {
      const validFormats = ["image/bmp", "image/jpeg", "image/png", "image/pbm", "image/webp"];
      if (!validFormats.includes(file.type)) {
        setErrorMessage("Invalid file format");
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const { data: { text } } = await Tesseract.recognize(file, "eng");
        const extractedData = extractKtpData(text);
        console.log("coba test", text)
        if (!extractedData) {
          setErrorMessage("KTP information not detected. Please try again with a clearer image.");
          onChange(null);
        } else {
          onChange(extractedData);
        }
      } catch (error) {
        console.error("Error recognizing text:", error);
        setErrorMessage("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const extractKtpData = (text) => {
    const lines = text.split("\n").map((line) => line.trim());

    // Extract NIK
    const nikPattern = new RegExp(`${LABEL_NIK}\s*[:\-\s]*([0-9]{16})`, "i");
    const nikMatch = text.match(nikPattern);
    const nik = nikMatch ? nikMatch[1] : null;

    // Extract Name (Assuming name is the second line of the KTP after NIK)
    const nameLineIndex = nikMatch ? lines.findIndex((line) => line.includes(nikMatch[0])) + 1 : -1;
    const name = nameLineIndex >= 0 && nameLineIndex < lines.length ? lines[nameLineIndex] : null;

    // Example structure for returning data
    return nik ? { nik, name } : null;
  };

  const openFilePicker = () => {
    inputRef.current.click();
  };

  return (
    <div className="w-full flex flex-col relative">
      <div
        role="presentation"
        className="relative bg-zinc-50 dark:hover:bg-black text-sm overflow-hidden transition-colors duration-300 
            disabled:bg-zinc-300 disabled:placeholder:text-black disabled:text-black outline-none border-2 
            dark:border-zinc-600 hover:bg-zinc-100 focus-within:bg-white focus-within:border-light dark:bg-dark2 
            dark:focus-within:bg-dark2 dark:focus-within:border-zinc-400 rounded-md flex items-center gap-2"
      >
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          className="hidden"
          onChange={handleFileUpload}
        />

        {isLoading ? (
          <div className="upload-icon bg-blue-500">
            <div className="spinner animate-spin text-white">Loading...</div>
          </div>
        ) : (
          <div
            className="upload-icon cursor-pointer bg-blue-500"
            role="presentation"
            onClick={openFilePicker}
          >
            Upload
          </div>
        )}
      </div>
      <span className="text-xs dark:text-white mt-1">*Supported Image Formats: bmp, jpg, png, pbm, webp</span>
      {errorMessage && <span className="text-red-500 text-xs mt-1">{errorMessage}</span>}
    </div>
  );
};

export default KtpDetector;
