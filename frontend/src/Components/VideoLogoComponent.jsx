import React from "react";
import '../css/background.css'
const VideoLogoComponent = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden" id="home">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover video-section"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/BG-Video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>

        {/* Video overlay for better logo visibility */}
        <div className="videobackground absolute inset-0 bg-black/70" />
      </div>

      {/* Logo Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
        <div className="mb-8 relative">
          <div className="relative flex items-center justify-center" style={{
            width: "80vw",
            height: "80vh"
          }}>
            <div className="absolute inset-0 bg-black rounded-full opacity-20 blur-xl animate-pulse" />
            <div className="relative flex items-center justify-center" style={{
              width: "80vw",
              height: "80vh"
            }}>
              <img
                src="/logo.png"
                alt="ETERNIA 2025"
                className="object-contain rounded-full"
                style={{
                  width: "80vw",
                  height: "80vh"
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="text-center hidden">
                <div className="text-4xl font-bold text-slate-800 mb-2">
                  ETERNIA
                </div>
                <div className="text-xl text-red-600 font-semibold">2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle pulsing effect rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
          <div className="w-86 h-86 rounded-full opacity-10 animate-pulse" />
        </div>
      </div>

      {/* Event Text */}
      <div className="relative z-20 text-center mb-8">
        <h1 className="typing-title text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wide mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
          ETERNIA
          <span className="block md:inline">&nbsp;2025</span>
        </h1>

        <p className="text-xl md:text-2xl tracking-widest text-purple-300 font-medium mb-4">
          #UNMASK THE NIGHTS
        </p>
        <p className="text-2xl md:text-3xl font-bold text-white">
          26TH - 29TH NOV
        </p>
      </div>

      {/* Navigation Links */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
        <a
          href="/code-of-conduct"
          className="text-purple-300 hover:text-white font-semibold text-lg hover:underline hover:underline-offset-4 transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          CODE OF CONDUCT
        </a>
        {/* <a
          href="/merchandise"
          className="text-purple-300 hover:text-white font-semibold text-lg hover:underline hover:underline-offset-4 transition-all duration-300 flex items-center gap-2"
        >
          MERCHANDISE
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
          </svg>
        </a> */}
      </div>

      {/* Social Media Icons */}
      <div className="relative z-20 flex gap-6 mb-8">
        {/* icons stay unchanged */}
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-10px) translateX(-10px) scale(0.9);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-15px) translateX(5px) scale(1.05);
            opacity: 0.35;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoLogoComponent;
