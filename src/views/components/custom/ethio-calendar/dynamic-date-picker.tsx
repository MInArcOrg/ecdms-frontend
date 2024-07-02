import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import EthioCalendar from './ethio-calendar';
import EthiopianDate from './ethiopian-date';

interface DynamicDatePickerProps {
  value: Date | EthiopianDate;
  onChange: (date: Date | EthiopianDate) => void;
  [key: string]: any; // To allow any additional props
}

const DynamicDatePicker: React.FC<DynamicDatePickerProps> = ({ value, onChange, ...rest }) => {
  const { i18n } = useTranslation();

  return i18n.language === 'am' ? (
    <EthioCalendar value={value as EthiopianDate} onChange={onChange} {...rest} />
  ) : (
    <DatePicker selected={value as Date} onChange={onChange as (date: Date) => void} dateFormat="dd/MM/yyyy" {...rest} />
  );
};

export default DynamicDatePicker;
