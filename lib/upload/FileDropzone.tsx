"use client";

import { UploadIcon } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { type Accept, useDropzone } from "react-dropzone";
import { imageAccept } from "./utils";
import { imageMaxSize } from "../../constants";

/*
 */
export default function FileDropzone({
  setFiles,
  multiple = false,
  accept = imageAccept,
  maxSize = imageMaxSize,
  className = "",
  name,
}: {
  setFiles?: (files: File[]) => void;
  multiple?: boolean;
  accept?: Accept;
  maxSize?: number; // bytes
  className?: string; // extra wrapper classes
  name?: string; // input name, form data key
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (setFiles) setFiles(acceptedFiles);
    },
    [setFiles],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    multiple,
    accept,
    maxSize,
  });

  // const rejectionMessage = useMemo(() => {
  //   if (!fileRejections || fileRejections.length === 0) return null;
  //   // collect reasons
  //   return fileRejections
  //     .map((r) => {
  //       const fileName = r.file.name;
  //       const reasons = r.errors.map((e) => e.message).join(", ");
  //       return `${fileName}: ${reasons}`;
  //     })
  //     .join("; ");
  // }, [fileRejections]);

  // const acceptedTypesDisplay = useMemo(() => {
  //   if (!accept) return null;
  //   const extensions = Object.values(accept).flat();
  //   return extensions.length > 0 ? extensions.join(", ") : null;
  // }, [accept]);

  return (
    <section className={`w-full ${className}`}>
      {/* biome-ignore lint/a11y/useSemanticElements: FileDropzone requires div for drag-and-drop functionality */}
      <div
        {...getRootProps()}
        role="button"
        tabIndex={0}
        aria-label="File select area. Drag and drop files here or click to select files"
        className={
          ` cursor-pointer relative flex  items-center gap-2 justify-center rounded-lg border-4 border-dashed p-6 transition-colors  focus:border-primary leading-4 ` +
          (isDragActive
            ? "border-primary bg-primary/40 "
            : isDragReject
              ? "border-red-400 bg-red-50 dark:bg-red-950"
              : "border-foreground/50 ")
        }
        onKeyDown={(e) => {
          // enter/space should open file dialog
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const input = e.currentTarget.querySelector(
              "input[type=file]",
            ) as HTMLInputElement;
            input?.click();
          }
        }}
      >
        <input {...getInputProps({ name })} />
        <UploadIcon size={16} className="" />
        <span className={`${isDragActive ? "text-primary-foreground" : ""}`}>
          {isDragActive ? "释放以投入文件" : "拖动和投入文件到此处"}
        </span>
        或者点击选择文件
        {/* <span className="text-sm text-gray-500 dark:text-gray-400"></span> */}
        {/* <p className="font-medium text-gray-900 dark:text-gray-100">
        </p> */}
        {/* <div className="text-center">

          {acceptedTypesDisplay && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Accepted: {acceptedTypesDisplay}
            </p>
          )}
          {maxSize && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Max size: {(maxSize / 1024 / 1024).toFixed(2)} MB
            </p>
          )}
        </div> */}
      </div>
      {/* {rejectionMessage && (
        <div className="absolute bottom-2 left-4 right-4 text-xs text-red-600 bg-red-50 dark:bg-red-950 p-2 rounded">
          {rejectionMessage}
        </div>
      )} */}
    </section>
  );
}
/*
Usage example:

import FileDropzone from './FileDropzone';
import { useState } from 'react';

export default function Page() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="p-6">
      <FileDropzone
        multiple={false}
        accept={['image/*', '.pdf']}
        maxSize={5 * 1024 * 1024}
        onFiles={(f) => setFiles(f)}
      />

      <div className="mt-4">
        {files.map((f) => (
          <div key={f.name} className="text-sm">{f.name} — {(f.size / 1024).toFixed(1)} KB</div>
        ))}
      </div>
    </div>
  );
}
*/
