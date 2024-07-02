import { useTranslation } from 'react-i18next';
import EthioCalendar from 'src/views/components/forms/ethioCalendar/EthioCalendar';
import DatePicker from 'react-datepicker';

const DynamicDatePicker = ({ value, onChange, ...rest }) => {
  const { i18n } = useTranslation();

  return i18n.language === 'am' ? (
    <EthioCalendar value={value} onChange={onChange} {...rest} />
  ) : (
    <DatePicker selected={value} onChange={onChange} dateFormat="dd/MM/yyyy" {...rest} />
  );
};

export default DynamicDatePicker;
