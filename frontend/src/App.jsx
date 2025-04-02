import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const App = () => {
  const [files, setFiles] = useState([]); // Store uploaded files

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]); // Send the first file

    try {
      const response = await axios.post("http://localhost:5002/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Ensure we append the new file correctly
      setFiles((prevFiles) => [...prevFiles, response.data.file]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }, []);
  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5002/files/all");
      console.log("Fetched data:", response.data); // Check the structure
      setFiles(Array.isArray(response.data) ? response.data : response.data.files || []);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };
  
  useEffect(() => {
    

    //fetchFiles();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="bg-blue-300 text-white p-4 w-full min-h-screen">
      {/* Header Section */}
      <div className="flex items-start p-4">
        <img src="logo.png" alt="logo" className="w-20 h-20" />
        <h1 className="text-2xl font-bold ml-4">File Upload</h1>
      </div>

      {/* Drag & Drop Area */}
      <div
        {...getRootProps()}
        className="mt-10 mx-auto w-3/4 p-10 border-4 border-dashed border-white rounded-lg text-center cursor-pointer transition-all duration-300 hover:bg-blue-400"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg font-semibold">Drop the files here ...</p>
        ) : (
          <p className="text-lg font-semibold">Drag & Drop files here, or click to select files</p>
        )}
      </div>

   {/* Uploaded Files List */}
<div className="mt-6 w-3/4 mx-auto">
  <h2 className="text-xl font-bold mb-3">Uploaded Files:</h2>
  {files.length > 0 ? (
    <ul className="bg-white text-black p-4 rounded-lg shadow-lg">
      {files.map((file) => (
        <li key={file._id} className="p-2 border-b last:border-b-0 flex justify-between">
          <span>{file.filename}</span>
          <a
            href={`http://localhost:5002/files/${file._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View
          </a>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-200">No files uploaded yet.</p>
  )}
</div>

      <button onClick={fetchFiles}>display</button>
    </div>
  );
};

export default App;
