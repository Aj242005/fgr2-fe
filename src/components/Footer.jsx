import React from 'react';

const GithubIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full py-24 px-4 flex flex-col items-center justify-center bg-black font-sans gap-6 mt-12 border-t border-white/5">
      {/* Title */}
      <h2 className="text-6xl md:text-8xl italic font-serif tracking-tight text-[#e2e1eb] hover:text-[#ffb77d] transition-colors duration-500 cursor-default m-0">
        Grid AI
      </h2>

      {/* Subtitle */}
      <p className="text-sm md:text-base font-medium text-[#c1c6d7] italic m-0">
        Detect every traffic violation in real time, at city scale.
      </p>

      {/* Built by section */}
      <div className="flex items-center gap-3 mt-4">
        <span className="text-sm font-medium text-[#c1c6d7]">Built by</span>
        <div className="flex -space-x-3">
          <a href="https://github.com/Garvgoel23" target="_blank" rel="noopener noreferrer" className="relative z-30 inline-block h-10 w-10 rounded-full ring-4 ring-black hover:z-40 transition-transform hover:scale-110">
            <img src="https://github.com/Garvgoel23.png" alt="Garvgoel23" className="h-full w-full rounded-full object-cover bg-black" />
          </a>
          <a href="https://github.com/Aj242005" target="_blank" rel="noopener noreferrer" className="relative z-20 inline-block h-10 w-10 rounded-full ring-4 ring-black hover:z-40 transition-transform hover:scale-110">
            <img src="https://github.com/Aj242005.png" alt="Aj242005" className="h-full w-full rounded-full object-cover bg-black" />
          </a>
          <a href="https://github.com/lakshinkhurana" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block h-10 w-10 rounded-full ring-4 ring-black hover:z-40 transition-transform hover:scale-110">
            <img src="https://github.com/lakshinkhurana.png" alt="lakshinkhurana" className="h-full w-full rounded-full object-cover bg-black" />
          </a>
        </div>
      </div>

      {/* Source Button */}
      <a
        href="https://github.com/Garvgoel23/Grid-AI"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 text-[#e2e1eb] hover:bg-white/5 transition-colors text-sm font-medium shadow-sm mt-2"
      >
        <GithubIcon className="w-4 h-4" />
        Source
      </a>

      {/* Copyright */}
      <div className="text-xs text-[#8b90a0] font-medium mt-4">
        © {new Date().getFullYear()} All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
