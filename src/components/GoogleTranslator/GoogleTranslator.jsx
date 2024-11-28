import React, { useState, useEffect } from 'react';
import { languages } from './languages';

const GoogleTranslator = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [chooseCountry, setChooseCountry] = useState({
        code: 'ko',
        name: '한국어',
        flag: 'kr',
    });

    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;

        if (document?.querySelector('script[src*="translate_a/element.js"]')) {
            setIsScriptLoaded(true);
            return;
        }

        const addGoogleTranslateScript = document?.createElement('script');
        addGoogleTranslateScript.src =
            'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        addGoogleTranslateScript.async = true;
        addGoogleTranslateScript.defer = true;

        addGoogleTranslateScript.onerror = () => {
            console.error('Failed to load Google Translate script');
        };

        addGoogleTranslateScript.onload = () => {
            setIsScriptLoaded(true);
        };

        window.googleTranslateElementInit = () => {
            try {
                setTimeout(() => {
                    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
                        try {
                            new window.google.translate.TranslateElement(
                                {
                                    pageLanguage: 'ko',
                                    autoDisplay: true,
                                    includedLanguages: languages.map(lang => lang.code).join(',')
                                },
                                'google_translate_element'
                            );
                        } catch (initError) {
                            console.error('Error creating TranslateElement:', initError);
                        }
                    } else {
                        console.error('Google Translate objects not fully available');
                    }
                }, 500);
            } catch (error) {
                console.error('Outer initialization error:', error);
            }
        };

        document?.body.appendChild(addGoogleTranslateScript);

        return () => {
            const script = document?.querySelector('script[src*="translate_a/element.js"]');
            if (script) {
                document?.body.removeChild(script);
            }
            delete window.googleTranslateElementInit;
        };
    }, []);

    const handleLanguageChange = (lang) => {
        try {
            const gtCombo = document?.querySelector('.goog-te-combo');
            if (!gtCombo) return;

            if (!window.google || !window.google.translate) {
                console.error('Google Translate not loaded');
                return;
            }

            const originalOnchange = gtCombo.onchange;
            gtCombo.onchange = null;

            gtCombo.value = lang.code;
            gtCombo.dispatchEvent(new Event('change', { bubbles: true }));

            setTimeout(() => {
                gtCombo.onchange = originalOnchange;
            }, 100);

            setChooseCountry(lang);
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    const handleWheel = (e) => {
        e.stopPropagation();
    };

    if (!isScriptLoaded) {
        return (
            <div className="flex items-center gap-2  w-[95px] h-[45px]">
                <div className="animate-pulse bg-gray-200 w-5 h-5 rounded"></div>
                <div className="animate-pulse bg-gray-200 w-16 h-4 rounded"></div>
            </div>
        );
    }

    return (
        <div id='google_translate_box'>
            <div id="google_translate_element" className="hidden"></div>

            <div
                className="relative flex items-center gap-1 cursor-pointer"
                onClick={() => setIsHovered(!isHovered)}
            >
                <div
                    className="w-[1.36rem] h-[1.36rem] bg-center bg-contain bg-no-repeat"
                    style={{
                        backgroundImage: `url(${require('../../assets/footer/language.png')})`,
                    }}
                ></div>
                <span className="text-sm">{chooseCountry.name}</span>

                {isHovered && (
                    <div
                        className="absolute bottom-8 left-[-170px] w-48 max-h-32 overflow-y-auto bg-white rounded z-50"
                        onWheel={handleWheel}
                    >
                        {languages.map((lang) => (
                            <div
                                key={lang.code}
                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleLanguageChange(lang)}
                            >
                                {/* <div
                                    className="w-5 h-5 bg-center bg-contain bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(https://cdn.weglot.com/flags/square/${lang.flag}.svg)`,
                                    }}
                                ></div> */}
                                <span className="text-sm">{lang.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoogleTranslator;
