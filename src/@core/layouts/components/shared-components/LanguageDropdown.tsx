// ** React Import
import { useEffect } from 'react';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Third Party Import
import { useTranslation } from 'react-i18next';

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu';

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext';

// ** Map language codes to flag icons (Iconify)
const flagIcons: Record<string, string> = {
  en: 'twemoji:flag-united-states', // 🇺🇸
  am: 'twemoji:flag-ethiopia' // 🇪🇹
};

interface Props {
  settings: Settings;
  saveSettings: (values: Settings) => void;
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
  const { i18n } = useTranslation();

  const handleLangItemClick = (lang: 'en' | 'am') => {
    i18n.changeLanguage(lang);
  };

  // ** Change html `lang` attribute when changing locale
  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  return (
    <OptionsMenu
      iconButtonProps={{ color: 'inherit' }}
      // Show icon flag of current language instead of generic language icon
      icon={<Icon icon={flagIcons['am']} fontSize="1.5rem" />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4.25, minWidth: 130 } } }}
      options={[
        {
          text: 'English',
          menuItemProps: {
            sx: { py: 2, display: 'flex', alignItems: 'center', gap: 1 },
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en');
              saveSettings({ ...settings, direction: 'ltr' });
            }
          },
          icon: <Icon icon={flagIcons.en} fontSize="1.25rem" />
        },
        {
          text: 'Amharic',
          menuItemProps: {
            sx: { py: 2, display: 'flex', alignItems: 'center', gap: 1 },
            selected: i18n.language === 'am',
            onClick: () => {
              handleLangItemClick('am');
              saveSettings({ ...settings, direction: 'ltr' });
            }
          },
          icon: <Icon icon={flagIcons.am} fontSize="1.25rem" />
        }
      ]}
    />
  );
};

export default LanguageDropdown;
