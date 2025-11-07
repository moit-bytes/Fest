import React, { useState } from "react";
import "../css/Navbar.css"; // external CSS for link styles

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Left side: Logos */}
        <div className="flex items-center gap-4">
          <img src="/aiims.png" alt="aiims" className="h-10 w-auto" />
          {/* <img src="/logo2.png" alt="Logo 2" className="h-10 w-auto" /> */}
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="navbar-anchor">HOME</a>
          {/* <a href="#brochure" className="navbar-anchor">BROCHURE</a> */}
          <a
  href="/Eternia.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="navbar-anchor"
>
  BROCHURE
</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSe7IRZ59WLepZGCIx0TW63doT2vFhrJ1GNmurdiW7qJS5lfUA/viewform?usp=publish-editor" className="navbar-anchor">REGISTRATION</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center space-y-1.5"
        >
          <span
            className={`block h-0.5 w-6 bg-white transform transition ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transform transition ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-6 pb-4 space-y-3">
          <a
            href="#home"
            className="navbar-anchor block"
            onClick={() => setIsOpen(false)}
          >
            HOME
          </a>
          <a
            href="/Eternia.pdf"
            className="navbar-anchor block"
            onClick={() => setIsOpen(false)}
          >
            BROCHURE
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe7IRZ59WLepZGCIx0TW63doT2vFhrJ1GNmurdiW7qJS5lfUA/viewform?usp=publish-editor"
            className="navbar-anchor block"
            onClick={() => setIsOpen(false)}
          >
            REGISTRATION
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
