import { useEffect, useMemo, useState } from 'react'
import Icon from 'src/@core/components/icon'
import OptionsMenu from 'src/@core/components/option-menu'
import { useTranslation } from 'react-i18next'

const GoogleTranslate = () => {
    const [isReady, setIsReady] = useState(false)
    const { i18n } = useTranslation()

    const languages = useMemo(
        () => [
            { code: 'en', label: 'English' },
            { code: 'am', label: 'Amharic' }
        ],
        []
    )

    const applyGoogleTranslateLanguage = (langCode: string) => {
        const normalizedLangCode = langCode?.split('-')[0] || 'en'
        document.cookie = `googtrans=/en/${normalizedLangCode};path=/`

        const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
        if (combo) {
            combo.value = normalizedLangCode
            combo.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
        }
    }

    useEffect(() => {
        const initializeGoogleTranslate = () => {
            // @ts-ignore
            if (window.google?.translate?.TranslateElement) {
                // @ts-ignore
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: languages.map((l) => l.code).join(','),
                        autoDisplay: false
                    },
                    'google_translate_element'
                )
                setIsReady(true)
            }
        }

        // @ts-ignore
        if (window.google?.translate?.TranslateElement) {
            initializeGoogleTranslate()
        } else {
            // @ts-ignore
            window.googleTranslateElementInit = initializeGoogleTranslate

            const scriptId = 'google-translate-script'
            if (!document.getElementById(scriptId)) {
                const addScript = document.createElement('script')
                addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit')
                addScript.id = scriptId
                document.body.appendChild(addScript)
            }
        }
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('lang', i18n.language)
    }, [i18n.language])

    useEffect(() => {
        if (!isReady) return
        applyGoogleTranslateLanguage(i18n.language)
    }, [i18n.language, isReady])

    return (
        <>
            <div
                id='google_translate_element'
                style={{
                    position: 'absolute',
                    opacity: 0,
                    pointerEvents: 'none',
                    height: 0,
                    width: 0,
                    overflow: 'hidden',
                    zIndex: -1
                }}
            />
            <OptionsMenu
                icon={<Icon icon='tabler:language' fontSize='1.5rem' />}
                iconButtonProps={{ color: 'inherit' }}
                menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4.25, minWidth: 130 } } }}
                options={languages.map((lang) => ({
                    text: lang.label,
                    menuItemProps: {
                        sx: { py: 2, display: 'flex', alignItems: 'center', gap: 1 },
                        selected: i18n.language === lang.code,
                        onClick: () => {
                            i18n.changeLanguage(lang.code)
                            applyGoogleTranslateLanguage(lang.code)
                        }
                    },
                    icon: null
                }))}
            />
        </>
    )
}

export default GoogleTranslate
