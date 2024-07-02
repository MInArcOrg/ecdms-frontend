import { EtDatetime } from 'abushakir';
import EthiopianDate from './ethiopian-date';

interface DateInput {
  year: number;
  month: number;
  day: number;
}

export const convertToGC = (date: DateInput): Date => {
  const convertedDate = new Date(new EtDatetime(date.year, date.month, date.day, 12, 0, 0, 0).moment);
  return convertedDate;
};

export const convertToEC = (date: Date | string): EthiopianDate => {
  const dateObj = new Date(date);
  const convertedDate = new EtDatetime(dateObj.getTime());
  return new EthiopianDate(convertedDate.year, convertedDate.month, convertedDate.day);
};

export const getDynamicDate = (i18n: any, date: Date | string): Date | EthiopianDate => {
  const newDate = new Date(
    typeof date === 'string'
      ? new Date(date.length > 10 ? date.substring(0, 10) : date).toISOString().slice(0, -1)
      : date.toISOString().slice(0, -1)
  ).getTime();

  return i18n.language === 'am' ? convertToEC(newDate.toString()) : new Date(newDate);
};
