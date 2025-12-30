"use client";

import { useState } from "react";
import { LanguagesIcon, Menu, X } from "lucide-react";
import type { FooterProps } from "../interface/t";

const Navigation = ({ isScrolled, handleLanguageToggle, t }: FooterProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "#solutions", label: t('nav.solutions') },
    { href: "#about", label: t('nav.about') },
    { href: "#technology", label: t('nav.technology') },
    { href: "#contact", label: t('nav.contact') },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white backdrop-blur-md border-b border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.1)]' 
          : 'bg-transparent backdrop-blur-md border-b border-white/10'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container gap-x-10 mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <a href="#" aria-label="Go to homepage">
            <img 
              className="w-24 transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" 
              src="/goai.png" 
              alt="Go AI Logo" 
            />
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className={`font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-red-500' 
                  : 'text-white/90 hover:text-red-400'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={() => handleLanguageToggle?.()}
            aria-label="Toggle language"
            className={`transition-all duration-300 hover:scale-110 ${
              isScrolled 
                ? 'text-gray-700 hover:text-red-500' 
                : 'text-white/90 hover:text-red-400'
            }`}
          >
            <LanguagesIcon className="w-5 cursor-pointer" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg transition-colors"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="block font-medium text-gray-700 hover:text-red-500 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              handleLanguageToggle?.();
              closeMobileMenu();
            }}
            className="flex items-center gap-2 font-medium text-gray-700 hover:text-red-500 transition-colors py-2"
            aria-label="Toggle language"
          >
            <LanguagesIcon className="w-5" />
            <span>{t('nav.language') || 'Language'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
