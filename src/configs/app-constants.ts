import { ThemeColor } from 'src/@core/layouts/types';
import { LangType } from 'src/types/lang';

export const LANG_CONST_ARRAY: LangType[] = [
  {
    label: 'Afaan Oromoo',
    id: 'om',
    default: true
  },
  {
    label: 'English',
    id: 'en',
    default: false
  },
  {
    label: 'አማርኛ',
    id: 'am',
    default: false
  }
];
export const ITEMS_LISTING_TYPE = {
  grid: { label: 'Grid', value: 'grid' },
  masonry: { label: 'Masonry', value: 'masonry' },
  list: { label: 'List', value: 'list' },
  table: { label: 'Table', value: 'table' }
};
export const availableColors: ThemeColor[] = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];
export const genderList = (transl: (word: string) => string): { label: string; value: string }[] => [
  { label: transl('department.user.male'), value: 'Male' },
  { label: transl('department.user.female'), value: 'Female' }
];
export const gridSpacing = 2;
export const acadamicLevels: string[] = [
  '1-12',
  'Certificate',
  'Diplome Degree',
  'Bachilor Degree',
  'Masters Degree',
  'PHD Degree',
  'others'
];
