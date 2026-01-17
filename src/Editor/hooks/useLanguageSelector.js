import { useState } from 'react';

const LANGUAGE_DEFAULTS = {
    javascript: `console.log('Hello, JavaScript!');`,
    python: `print("Hello, Python!")`,
    java: `System.out.println("Hello, Java!");`
};

export const useLanguageSelector = () => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState(LANGUAGE_DEFAULTS.javascript);

    const changeLanguage = (newLanguage) => {
        if (LANGUAGE_DEFAULTS[newLanguage]) {
            setLanguage(newLanguage);
            setCode(LANGUAGE_DEFAULTS[newLanguage]);
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
