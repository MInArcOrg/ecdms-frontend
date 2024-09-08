import { EtDatetime } from 'abushakir';
import moment from 'moment';
import EthiopianDate from './ethiopian-date';

interface DateInput {
  year: number;
  month: number;
  day: number;
}
export const convertToGC = (date: DateInput) => {
  // Create an EtDatetime instance using the provided Ethiopian date
  const etDate = new EtDatetime(date.year, date.month, date.day, 12, 0, 0, 0);

  const gregorianDate = new Date(etDate.moment);

  return gregorianDate;
};

export const convertToEC = (date: Date | string): EthiopianDate => {
  const dateObj = new Date(date);
  const convertedDate = new EtDatetime(dateObj.getTime());
  return new EthiopianDate(convertedDate.year, convertedDate.month, convertedDate.day);
};

export const getDynamicDate = (i18n: any, date: Date | string | undefined | EthiopianDate): Date | EthiopianDate => {
  const newDate = moment(date);

  return i18n.language === 'am' ? convertToEC(newDate.toDate()) : newDate.toDate();
};
