/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import folderIcon from "@@/public/images/folderfileicon.png";
import pdfIcon from "@@/public/images/pdf.png";
import excelCsvIcon from "@@/public/images/logo_xls.png";
import { Icon } from "@iconify/react";
import { IconsCollection } from "@@/src/constant/icons";

type FileInputProps = {
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
  disabled?: boolean;
  preview?: boolean;
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
  isDisburs?: boolean;
  onFilesChange?: (files: File[] ) => void;
  files: File[]
  defaultImage?: string[]
  readOnly?: boolean
};

const FileInput: React.FC<FileInputProps> = ({
  accept = "image/png, image/jpeg, application/pdf",
  maxSize = 5,
  multiple = false,
  disabled = false,
  preview = true,
  id,
  label = "",
  required = true,
  error = "",
  isDisburs = false,
  onFilesChange,
  files=[],
  defaultImage,
  readOnly=false
}) => {
  const getAcceptFile = () => {
    return accept.split(",").map((item) => item.split("/")[1]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.size <= maxSize * 1024 * 1024
    );

    if (validFiles.length !== selectedFiles.length) {
      alert("Some files exceed the file size limit");
    }

    onFilesChange(validFiles);
  };

  const handleDelete = (index: number) => {
    const updatedFiles = files.filter((_, ind) => ind !== index);
    onFilesChange(updatedFiles);
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    } else if (file.type === "application/pdf") {
      return pdfIcon.src;
    } else if (
      file.type === "application/vnd.ms-excel" ||
      file.type === "text/csv" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return excelCsvIcon.src;
    } else {
      return folderIcon.src;
    }
  };

  return (
    <div>
      {label && <label className="first-letter:uppercase mb-1 inline-block font-semibold text-sm xl:text-xs 2xl:text-sm capitalize" htmlFor={id}>{label} {required && <span className="text-red-500">*</span>}</label>}
      <div className="flex items-center gap-2 w-full">
        {
          defaultImage && defaultImage.map((item, key: number) => {
            console.log(item)
            return (
              <div key={key}
                className="group flex items-center justify-center bg-zinc-200 border border-gray-300 w-[90px] h-[90px] rounded-lg overflow-hidden shadow-sm p-2 relative"
              >
                <img src={item} alt={item} />
              </div>
            )
          })
        }
        {files.length > 0 ? (
          <div className="flex items-center gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="group flex items-center justify-center border border-gray-300 w-[90px] h-[90px] rounded-lg overflow-hidden bg-white shadow-sm p-2 relative"
              >
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="w-5 h-5 rounded-full group-hover:visible group-hover:opacity-100 invisible opacity-0 duration-300 ease-in-out bg-red-500/30 flex items-center justify-center absolute top-0 right-0"
                >
                  <Icon icon={IconsCollection.close} />
                </button>
                  {preview && file instanceof File && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={getFilePreview(file)}
                      alt="Preview"
                      className="file-image w-full h-auto max-w-[90px] max-h-[90px] object-cover p-2 rounded"
                    />
                  )}
              </div>
            ))}
            <div hidden={isDisburs}>
              <h1 className="text-primary-500 font-semibold text-xs">
                Max Size {maxSize} MB
              </h1>
              <p className="font-semibold text-primary-500 text-xs">
                Format File {getAcceptFile().join(", ")}
              </p>
            </div>
            <div hidden={!isDisburs}>
              <h1 className="text-primary-500 text-xs">
                File Format must be Ms. Excel (XLS) or CSV
              </h1>
              <p className="text-primary-500 text-xs">
                Download Excel or CSV <span className="font-bold">template</span>
              </p>
            </div>
          </div>
        ) : (
            !readOnly && (
              <>
                <input
                  id={id}
                  type="file"
                  accept={accept}
                  multiple={multiple}
                  disabled={disabled}
                  onChange={handleFileChange}
                  className="file-input mb-4 p-2 border border-gray-300 rounded cursor-pointer hidden"
                />
                <label htmlFor={id} className="w-full flex items-center gap-2 cursor-pointer">
                  <div className="border rounded-md flex items-center justify-center w-[90px] h-[90px]">
                    <Image src={folderIcon} alt="Folder icon" />
                  </div>
                  <div hidden={isDisburs}>
                    <h1 className="text-primary-500 font-semibold text-xs">
                      Max Size {maxSize} MB
                    </h1>
                    <p className="font-semibold text-primary-500 text-xs">
                      Format File {getAcceptFile().join(", ")}
                    </p>
                  </div>
                  <div hidden={!isDisburs}>
                    <h1 className="text-primary-500 text-xs">
                      File Format must be Ms. Excel (XLS) or CSV
                    </h1>
                    <p className="text-primary-500 text-xs">
                      Download Excel or CSV <span className="font-bold">template</span>
                    </p>
                  </div>
                </label>
              </>
            )
        )}
      </div>
      <p className="text-xs text-red-500 mt-1 first-letter:uppercase">{error}</p>
    </div>
  );
};

export default FileInput;
