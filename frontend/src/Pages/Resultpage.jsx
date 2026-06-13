import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const result = location.state;
  if (!result) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        No prediction data found.
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f4f4f0] font-['Satoshi'] selection:bg-[#f4f4f0] selection:text-[#050505] flex flex-col">
      <header className="w-full p-8 md:px-12 py-8 flex justify-between items-center border-b border-white/10 relative z-20 bg-[#050505]">
        <div className="text-xl font-medium tracking-tight">
          Authenticity
          <span className="italic font-light text-white/40">Scanner.</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
          <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-white/50">
            Analysis Complete
          </span>
        </div>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row relative overflow-hidden">
        {/* Left Panel: The Verdict */}
        <div className="lg:w-[65%] p-8 md:p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07] pointer-events-none bg-white"></div>

          <div className="relative z-10">
            <h1
              className={`p-5 text-[15vw] lg:text-[10vw] font-bold leading-[0.8] tracking-tighter uppercase rounded-2xl
                ${
                  result.prediction.includes("Real")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
            >
              {result.prediction}
            </h1>

            <div className="mt-12 max-w-lg border-l border-white/20 pl-6">
              <p className="text-lg text-white/60 font-light leading-relaxed">
                {result.prediction.includes("Real")
                  ? "No synthetic manipulation detected. The analyzed media exhibits natural variance and structural integrity consistent with genuine photography."
                  : "Synthetic patterns and anomalies were detected. The analyzed media shows characteristics commonly associated with AI-generated or manipulated imagery."}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-[35%] bg-[#0a0a0a] p-8 md:p-12 lg:p-20 flex flex-col justify-between relative z-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/50 mb-12">
              Analysis Metrics
            </p>

            <div className="mb-16">
              <div className="flex justify-between items-end mb-6">
                <span className="text-xs text-white/60 uppercase tracking-widest">
                  Confidence
                </span>
                <span className="text-6xl font-light tracking-tighter">
                  {result.confidence}
                  <span className="text-3xl text-white/40">%</span>
                </span>
              </div>

              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-white"
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  Model Architecture
                </span>
                <span className="text-xs text-white font-medium tracking-wide">
                  Xception
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  Training Phase
                </span>
                <span className="text-xs text-white font-medium tracking-wide">
                  Phase 03
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  Processing Time
                </span>
                <span className="text-xs text-white font-medium tracking-wide">
                  1.24s
                </span>
              </div>
            </div>
          </div>

          <button className="w-full py-5 mt-16 text-[11px] uppercase tracking-[0.25em] font-bold bg-white text-black hover:bg-[#e0e0e0] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_-10px_rgba(255,255,255,0.2)] hover:-translate-y-1">
            Scan New Image
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
