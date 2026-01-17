import { useState, useEffect } from 'react';

const LANGUAGE_DEFAULTS = {
    javascript: `console.log('Hello, JavaScript!');`,
    python: `print("Hello, Python!")`,
    java: `System.out.println("Hello, Java!");`
};

export const useLanguageSelector = () => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState(LANGUAGE_DEFAULTS.javascript);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCode = localStorage.getItem('editorCode');
        const savedLanguage = localStorage.getItem('editorLanguage');
        
        if (savedCode) {
            setCode(savedCode);
        }
        
        if (savedLanguage && LANGUAGE_DEFAULTS[savedLanguage]) {
            setLanguage(savedLanguage);
        }
    }, []);

    const changeLanguage = (newLanguage) => {
        if (LANGUAGE_DEFAULTS[newLanguage]) {
            setLanguage(newLanguage);
            setCode(LANGUAGE_DEFAULTS[newLanguage]);
            localStorage.removeItem('editorCode');
            localStorage.removeItem('editorLanguage');
        }
    };

    const updateCode = (newCode) => {
        setCode(newCode);
    };

    const getLanguages = () => Object.keys(LANGUAGE_DEFAULTS);

    return {
        language,
        code,
        changeLanguage,
        updateCode,
        getLanguages,
        setCode
    };
};
