import { EtDatetime } from 'abushakir';
import { convertToGC } from './ethio-calendar-utils';

const days = [{ sun: 'እሑድ' }, { mon: 'ሰኞ' }, { tue: 'ማክሰኞ' }, { wed: 'ረቡዕ' }, { thu: 'ሐሙስ' }, { fri: 'ዓርብ' }, { sat: 'ቅዳሜ' }];

type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

const dayKeys: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

interface EthiopianDateProps {
  year: number;
  month: number;
  day: number;
}

export default class EthiopianDate implements EthiopianDateProps {
  year: number;
  month: number;
  day: number;

  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  toString(): string {
    return `${this.day}/${this.month}/${this.year}`;
  }

  toGregorianDate(): Date {
    const ethiopianYear = this.year + 8;
    const ethiopianMonth = this.month - 1;
    const ethiopianDay = this.day;

    const etDate = new EtDatetime(ethiopianYear, ethiopianMonth, ethiopianDay, 12, 1, 1, 1);

    return new Date(etDate.moment);
  }

  // Getters
  getFullYear(): number {
    return this.year;
  }

  getMonth(): number {
    return this.month;
  }

  getDate(): number {
    return this.day;
  }

  getDay(): number {
    const gregorianDate = this.toGregorianDate();
    return gregorianDate.getUTCDay();
  }

  getHours(): number {
    return 0;
  }

  getMinutes(): number {
    return 0;
  }

  getSeconds(): number {
    return 0;
  }

  getMilliseconds(): number {
    return 0;
  }

  // Setters
  setFullYear(year: number): void {
    this.year = year;
  }

  setMonth(month: number): void {
    this.month = month;
  }

  setDate(day: number): void {
    this.day = day;
  }

  // Other methods
  getTime(): number {
    const gregorianDate = this.toGregorianDate();
    return gregorianDate.getTime();
  }

  toDateString(): string {
    const date = {
      year: this.year,
      month: this.month,
      day: this.day
    };

    const gDate = convertToGC(date);

    const etDate = new EtDatetime(date.year, date.month, date.day, 12, 0, 0, 0);
    const monthName = etDate.monthGeez;
    const dayKey = dayKeys[gDate.getDay()];
    const dayName = days.find((day) => Object.keys(day)[0] === dayKey)?.[dayKey];

    return `${dayName} ${monthName} ${date.day} ${date.year}`;
  }

  toLocaleString(): string {
    const date = {
      year: this.year,
      month: this.month,
      day: this.day
    };

    const etDate = new EtDatetime(date.year, date.month, date.day, 12, 0, 0, 0);
    const monthName = etDate.monthGeez;

    return `${monthName} ${date.year}`;
  }

  toLocaleDateString(): string {
    const ethiopianDate = `${this.day}/${this.month}/${this.year}`;
    return ethiopianDate;
  }
}
