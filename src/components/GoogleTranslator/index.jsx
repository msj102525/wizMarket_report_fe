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

    // useEffect(() => {
    //     if (isScriptLoaded) {
    //         console.log('Google Translate script loaded. Checking initialization...');
    //         if (window.google && window.google.translate) {
    //             console.log('Google Translate initialized successfully.');
    //         } else {
    //             console.error('Google Translate failed to initialize.');
    //         }
    //     }
    // }, [isScriptLoaded]);

    useEffect(() => {
        // 스크립트가 이미 로드되었는지 확인
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
            // console.log('Google Translate script loaded');
            setIsScriptLoaded(true);
        };

        window.googleTranslateElementInit = () => {
            // console.log('googleTranslateElementInit called');
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
                            // console.log('TranslateElement initialized successfully');
                        } catch (initError) {
                            console.error('Error creating TranslateElement:', initError);
                        }
                    } else {
                        console.error('Google Translate objects not fully available:', {
                            google: !!window.google,
                            translate: window.google ? !!window.google.translate : 'No google object',
                            TranslateElement: window.google && window.google.translate ?
                                !!window.google.translate.TranslateElement : 'No translate object'
                        });
                    }
                }, 500);  // Add a small delay
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
            if (!gtCombo) {
                // console.error('.goog-te-combo element not found.');
                return;
            }
            
            // 이벤트 리스너 일시적으로 제거
            const originalOnchange = gtCombo.onchange;
            gtCombo.onchange = null;
            
            // 언어 변경
            gtCombo.value = lang.code;
            gtCombo.dispatchEvent(new Event('change', { bubbles: true }));
            
            // 잠시 후 원래 이벤트 리스너 복원
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
            <div className="flex items-center gap-2 p-2 w-[95px] h-[45px] bg-white rounded shadow">
                <div className="animate-pulse bg-gray-200 w-5 h-5 rounded"></div>
                <div className="animate-pulse bg-gray-200 w-16 h-4 rounded"></div>
            </div>
        );
    }

    return (
        <>
            <div id="google_translate_element" className="hidden"></div>

            <div
                className="relative flex items-center gap-2 p-2 w-24 max-h-60 bg-white rounded shadow cursor-pointer"
                onMouseEnter={() => {
                    if (!isScriptLoaded) return; // 스크립트가 로드되지 않은 경우 중단
                    setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="w-5 h-5 bg-center bg-contain bg-no-repeat"
                    style={{
                        backgroundImage: `url(https://cdn.weglot.com/flags/square/${chooseCountry.flag}.svg)`,
                    }}
                ></div>
                <span className="text-sm">{chooseCountry.name}</span>

                {isHovered && (
                    <div
                        className="absolute top-9 left-0 w-24 max-h-60 mt-1 overflow-y-auto bg-white rounded shadow-lg z-50"
                        onWheel={handleWheel}
                    >
                        {languages.map((lang) => (
                            <div
                                key={lang.code}
                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleLanguageChange(lang)}
                            >
                                <div
                                    className="w-5 h-5 bg-center bg-contain bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(https://cdn.weglot.com/flags/square/${lang.flag}.svg)`,
                                    }}
                                ></div>
                                <span className="text-sm">{lang.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default GoogleTranslator;