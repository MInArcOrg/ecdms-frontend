import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import OptionsMenu from 'src/@core/components/option-menu'

const GoogleTranslate = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const initializeGoogleTranslate = () => {
            // @ts-ignore
            if (window.google?.translate?.TranslateElement) {
                // @ts-ignore
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,am',
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

    const handleLanguageChange = (langCode: string) => {
        const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement
        if (combo) {
            combo.value = langCode
            combo.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
        }
    }

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'am', label: 'Amharic' }
    ]

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
                options={languages.map(lang => ({
                    text: lang.label,
                    menuItemProps: {
                        onClick: () => handleLanguageChange(lang.code)
                    }
                }))}
            />
        </>
    )
}

export default GoogleTranslate
