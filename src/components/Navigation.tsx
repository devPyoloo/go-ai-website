import { LanguagesIcon } from "lucide-react";
import type { FooterProps } from "../interface/t";

const Navigation = ({ isScrolled, handleLanguageToggle, t }: FooterProps) => (
  <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white backdrop-blur-md border-b border-gray-200 shadow-lg' 
            : 'bg-transparent backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="container gap-x-10 mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center space-x-2">
            <img className="w-24" src="/goai.png" alt="Go AI Logo" />
          </div>
          <div className="hidden md:flex space-x-8">
            <a 
              href="#solutions" 
              className={`font-medium backdrop-blur-sm transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-red-500' 
                  : 'text-white/90 hover:text-red-400'
              }`}
            >
              {t('nav.solutions')}
            </a>
            <a 
              href="#about" 
              className={`font-medium backdrop-blur-sm transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-red-500' 
                  : 'text-white/90 hover:text-red-400'
              }`}
            >
              {t('nav.about')}
            </a>
            <a 
              href="#technology" 
              className={`font-medium backdrop-blur-sm transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-red-500' 
                  : 'text-white/90 hover:text-red-400'
              }`}
            >
              {t('nav.technology')}
            </a>
            <a 
              href="#contact" 
              className={`font-medium backdrop-blur-sm transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-red-500' 
                  : 'text-white/90 hover:text-red-400'
              }`}
            >
              {t('nav.contact')}
            </a>
            <button onClick={handleLanguageToggle}><LanguagesIcon className={`w-5 cursor-pointer ${
                isScrolled 
                  ? 'text-gray-700 hover:text-red-500' 
                  : 'text-white/90 hover:text-red-400'
              }`} /> </button>
          </div>
        </div>
      </nav>
);

export default Navigation;
