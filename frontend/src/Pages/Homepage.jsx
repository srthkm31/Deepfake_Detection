import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: { "image/*": [] },
      maxSize: 5 * 1024 * 1024, // 5 MB limit
      maxFiles: 1,
      disabled: isPredicting,
    });

  const handlePredict = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setIsPredicting(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      navigate("/result", {
        state: res.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsPredicting(false);
    }
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f4f4f0] font-['Satoshi'] selection:bg-[#f4f4f0] selection:text-[#050505] flex flex-col lg:flex-row">
      {/* Left Panel: Editorial Typography */}
      <div className="lg:w-[55%] p-8 md:p-12 lg:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative">
        {/* Top Meta Details */}
        <div className="flex justify-between items-start w-full text-md tracking-wider text-white/80">
          <div className="flex flex-col gap-1">
            <span>Model / Xception</span>
            <span>Training / Phase 03</span>
          </div>
          <span>Max_Size / 5.0MB</span>
        </div>

        {/* Main Title & Description */}
        <div className="mt-24 lg:mt-0">
          <h1 className="text-[12vw] lg:text-[7vw] font-medium leading-[0.85] tracking-tighter mb-8 text-white">
            Authenticity
            <br />
            <span className="italic font-light text-white/40">Scanner.</span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-white/60 font-light">
            Upload media to verify its origin. This detection engine utilizes an
            advanced{" "}
            <strong className="font-medium text-white">Xception model</strong>,
            explicitly trained through Phase 3 to distinguish genuine
            photography from deepfakes and synthetic generation.
          </p>
        </div>

        {/* Bottom Decorative Element */}
        <div className="hidden lg:flex items-center gap-4 mt-12">
          <div className="h-[1px] w-12 bg-white/20"></div>
          <span className=" text-md tracking-wide text-white/60">
            Disclaimer: This AI-generated prediction may not always be accurate.
          </span>
        </div>
      </div>

      {/* Right Panel: Interactive Interface */}
      <div className="lg:w-[45%] bg-[#0a0a0a] p-8 md:p-12 lg:p-20 flex flex-col justify-center items-center">
        <div className="w-full max-w-md flex flex-col gap-8">
          {/* Dropzone Container */}
          <div
            {...getRootProps()}
            className={`group relative flex flex-col items-center justify-center w-full aspect-[4/5] md:aspect-square bg-[#050505]/50 transition-all duration-500 ease-out cursor-pointer overflow-hidden
              ${isDragActive ? "border-2 border-white scale-[0.98] bg-white/5" : "border border-white/10 hover:border-white/30"}
              ${isPredicting ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
              ${preview ? "border-none bg-black" : ""}
            `}
          >
            <input {...getInputProps()} />

            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Upload preview"
                  className="object-cover w-full h-full opacity-80 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100"
                />
                {!isPredicting && (
                  <button
                    onClick={removeImage}
                    className="absolute z-20 top-4 right-4 bg-black/80 backdrop-blur-sm text-white text-[9px] px-3 py-1.5 uppercase tracking-[0.2em] font-semibold hover:bg-black border border-white/10 transition-colors"
                  >
                    Remove
                  </button>
                )}
                {/* Minimal crosshairs overlay for aesthetics */}
                <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none z-10 mix-blend-overlay"></div>
              </>
            ) : (
              <div className="text-center p-8 flex flex-col items-center z-10">
                <div
                  className={`w-12 h-12 rounded-full border flex items-center justify-center mb-6 transition-colors duration-500 ${isDragActive ? "border-white bg-white text-black" : "border-white/20 text-white/40 group-hover:border-white/50 group-hover:text-white"}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </div>
                <p className="text-xl font-medium tracking-tight mb-2 text-white">
                  {isDragActive ? "Release to scan" : "Select Image"}
                </p>
                <p className="text-xs text-white/40 font-light">
                  Drag & drop or click to browse
                </p>
              </div>
            )}
          </div>

          {/* Rejection Message */}
          {fileRejections.length > 0 && (
            <div className="text-[10px] text-[#ff4444] uppercase tracking-widest text-center">
              * Error: File must be an image under 5MB.
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handlePredict}
            disabled={!file || isPredicting}
            className={`w-full py-4 text-md uppercase tracking-wider transition-all duration-300
              ${
                !file || isPredicting
                  ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/5"
                  : "bg-white text-black hover:bg-[#e0e0e0] shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_-10px_rgba(255,255,255,0.2)] hover:-translate-y-1"
              }
            `}
          >
            <span className="flex items-center justify-center gap-3">
              {isPredicting ? (
                <>
                  <svg
                    className="animate-spin h-3.5 w-3.5 text-current opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Predicting... Please wait
                </>
              ) : (
                "Predict"
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
