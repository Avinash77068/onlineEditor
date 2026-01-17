import { useState } from 'react';
import { ChevronDown, Code } from 'lucide-react';

const LanguageSelector = ({ language, onLanguageChange, languages }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languageIcons = {
    javascript: '🟨',
    python: '🐍',
    java: '☕'
  };

  const languageNames = {
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java'
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{paddingTop: "10px",paddingBottom: "10px",paddingLeft: "10px",paddingRight: "10px" }}
        className="flex items-center gap-2 bg-[#102A44] border border-[#1E3A5F] px-4 text-blue-300 hover:text-blue-200 hover:bg-[#1E3A5F] transition-all duration-200 min-w-[140px]"
      >
        <Code size={16} />
        <span className="text-sm font-medium">
          {languageIcons[language]} {languageNames[language]}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-[#102A44] border border-[#1E3A5F] rounded-lg shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onLanguageChange(lang);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[#1E3A5F] transition-colors duration-150 ${
                language === lang
                  ? "bg-[#1E3A5F] text-blue-200"
                  : "text-blue-300"
              }`}
            >
              <span>{languageIcons[lang]}</span>
              <span className="text-sm">{languageNames[lang]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default LanguageSelector;
