import React, { useState } from "react";

const ImageSolver = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-lg flex gap-6 max-w-4xl w-full">
        {/* File Upload Box */}
        <label
          className="w-1/2 h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300 transition"
        >
          <input
            type="file"
            className="hidden"
            accept=".jpg,.png,.pdf"
            onChange={handleFileChange}
          />
          {file ? (
            <p className="text-sm text-center">{file.name}</p>
          ) : (
            <p className="text-lg font-semibold">Upload file here</p>
          )}
          <span className="text-2xl mt-2">☻</span>
        </label>

        {/* Instructions */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="text-gray-600 text-sm">
            Upload your question paper in image or PDF format, and we'll
            automatically extract the questions and provide solutions using AI.
            Make sure the image quality is clear for better results.
            <br />
            <br />
            <strong>Supported file types:</strong> JPG, PNG, PDF.
          </p>

          {/* Solve Button */}
          <button className="mt-4 px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 transition">
            Solve it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSolver;
