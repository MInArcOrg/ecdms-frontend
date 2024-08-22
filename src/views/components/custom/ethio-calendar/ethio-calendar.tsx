import { Icon } from '@iconify/react';
import { Box, ClickAwayListener, Grid, IconButton, Menu, Typography, useTheme } from '@mui/material';
import { EtDatetime } from 'abushakir';
import { FC, useRef, useState } from 'react';
import CustomTextField from 'src/@core/components/mui/text-field';
import CalendarDropdownBtn from './calendar-dropdown-btn';
import EthiopianDate from './ethiopian-date';

const ethiopianMonthNames = ['መስከረም', 'ጥቅምት', 'ኅዳር', 'ታህሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'];

const ethiopianDayNames = ['ሰ', 'ማ', 'ረ', 'ሐ', 'ዓ', 'ቅ', 'እ'];

const ethiopian = new EtDatetime();

interface EthioCalendarProps {
  value: EthiopianDate | null;
  onChange: (date: EthiopianDate) => void;
  placeholderText?: string;
  disabled?: boolean;
  [key: string]: any;
}

const EthioCalendar: FC<EthioCalendarProps> = ({ value, onChange, placeholderText, disabled, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const textFieldRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new EthiopianDate(ethiopian.year, ethiopian.month - 1, ethiopian.day));

  const renderYearOptions = (): number[] => {
    const currentYear = currentMonth.getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return years;
  };

  // States that rely on above functions
  const [years, setYears] = useState<number[]>(renderYearOptions());

  const handleTextFieldBlur = () => {
    setTimeout(() => {
      if (textFieldRef.current && !textFieldRef.current.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 0);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevState: { getFullYear: () => number; getMonth: () => number }) => {
      const prevMonth1 = new EthiopianDate(prevState.getFullYear(), prevState.getMonth() - 1, 1);

      if (prevState.getMonth() === 0) {
        return new EthiopianDate(prevState.getFullYear() - 1, 12, 1);
      }

      return prevMonth1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevState: { getFullYear: () => any; getMonth: () => number }) => {
      const nextMonth = new EthiopianDate(prevState.getFullYear(), prevState.getMonth() + 1, 1);

      if (nextMonth.getMonth() === 13) {
        return new EthiopianDate(nextMonth.getFullYear() + 1, 0, 1);
      }

      return nextMonth;
    });
  };

  const handleCalendarToggle = () => {
    if (!isOpen) {
      setAnchorEl(textFieldRef.current);
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  };

  const handleDateSelect = (data: EthiopianDate) => {
    setIsOpen(false);
    onChange(new EthiopianDate(data.getFullYear(), data.getMonth(), data.getDate()));
  };

  const getEthiopianMonthDays = (month: number, year: number): number => {
    if (month === 12) {
      // Pagume month has 5 or 6 days
      return isEthiopianLeapYear(year) ? 6 : 5;
    } else {
      // Other months have 30 days
      return 30;
    }
  };

  const isEthiopianLeapYear = (year: number): boolean => {
    // Check if the given Ethiopian year is a leap year
    // Leap years are every 4th year
    return (year + 1) % 4 === 0;
  };

  const renderCalendarDays = () => {
    const days = [];
    const ethiopianMonth = currentMonth.getMonth();
    const ethiopianYear = currentMonth.getFullYear();

    // Calculate the number of days in the previous month
    const previousMonth = ethiopianMonth === 0 ? 12 : ethiopianMonth - 1;
    const previousMonthYear = ethiopianMonth === 0 ? ethiopianYear - 1 : ethiopianYear;
    const previousMonthDays = getEthiopianMonthDays(previousMonth, previousMonthYear);

    // Calculate the number of days in the current month
    const currentMonthDays = getEthiopianMonthDays(ethiopianMonth, ethiopianYear);

    // Calculate the starting day of the current month
    const startingDay = new EthiopianDate(ethiopianYear, ethiopianMonth, 1).getDay();

    // Render Ethiopian day names at the top
    days.push(
      <Grid container key="day-names" sx={{ marginBottom: 1.5 }}>
        {ethiopianDayNames.map((day, index) => (
          <Grid item xs={1.7} mb={1} key={index}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '14px', textAlign: 'center' }}>
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>
    );

    // Fill the gaps with days from the previous month
    for (let i = startingDay === 0 ? startingDay : startingDay - 1; i >= 0; i--) {
      const day = previousMonthDays - i;

      days.push(
        <Grid item xs={1.8} key={`prev-${i}`} mr={-0.8}>
          <IconButton
            disabled
            sx={{
              height: '100%',
              width: '110%',
              border: 'none'
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '12px',
                textAlign: 'center'
              }}
              color="text.disabled"
            >
              {day}
            </Typography>
          </IconButton>
        </Grid>
      );
    }

    // Render days from the current month
    for (let i = 1; i <= currentMonthDays; i++) {
      const currentDate = new EthiopianDate(ethiopianYear, ethiopianMonth + 1, i);

      const isSelectedDate =
        value && value.getFullYear() === currentDate.year && value.getMonth() === currentDate.month && value.getDate() === i;

      const isCurrentDate = ethiopian.year === currentDate.year && ethiopian.month === currentDate.month && ethiopian.day === i;

      days.push(
        <Grid item xs={1.8} key={i} mr={-0.8}>
          <IconButton
            color={isSelectedDate ? 'primary' : 'secondary'}
            onClick={() => handleDateSelect(currentDate)}
            sx={{
              width: '115%',
              backgroundColor: isSelectedDate ? theme.palette.primary.main : 'inherit',
              border: isCurrentDate ? `0.5px solid ${theme.palette.primary.main} ` : 'none'
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '12px',
                textAlign: 'center',
                color: isSelectedDate ? 'white' : isCurrentDate ? 'primary.main' : theme.palette.text.primary
              }}
            >
              {i}
            </Typography>
          </IconButton>
        </Grid>
      );
    }

    // Fill the remaining gaps with days from the next month
    const remainingDays = 42 - startingDay - currentMonthDays;

    for (let i = 1; i <= remainingDays; i++) {
      // Break out of the loop if the total number of days exceeds 42
      if (days.length === 36) {
        break;
      }

      days.push(
        <Grid item xs={1.8} key={`next-${i}`} mr={-0.8} mb={1}>
          <IconButton
            disabled
            sx={{
              height: '100%',
              width: '110%',
              border: 'none'
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '12px',
                textAlign: 'center'
              }}
              color="text.disabled"
            >
              {i}
            </Typography>
          </IconButton>
        </Grid>
      );
    }

    return days;
  };

  const getMonthYear = (): string => {
    const ethiopianYear = currentMonth.getFullYear();
    const ethiopianMonth = currentMonth.getMonth();
    const month = ethiopianMonthNames[ethiopianMonth];

    return `${month} ${ethiopianYear}`;
  };

  return (
    <ClickAwayListener onClickAway={handleTextFieldBlur}>
      <Box ref={textFieldRef}>
        <CustomTextField
          variant="outlined"
          autoComplete="off"
          placeholder={placeholderText || 'Select Date'}
          value={value ? value.toLocaleDateString() : ''}
          onClick={!disabled ? handleCalendarToggle : () => {}}
          fullWidth
          InputProps={{
            style: { cursor: 'pointer' }
          }}
          disabled={disabled}
          {...rest}
        />
        <Menu keepMounted anchorEl={anchorEl} onClose={() => setIsOpen(false)} open={isOpen} sx={{ maxWidth: '100%' }}>
          <Box sx={{ width: '240px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                py: 1
              }}
            >
              <IconButton
                sx={{
                  height: '50%',
                  backgroundColor: theme.palette.mode === 'dark' ? '#3D4156' : '#EFEFF0',
                  p: 0.5,
                  mt: 1
                }}
                size="small"
                color="secondary"
                onClick={handlePrevMonth}
              >
                <Icon icon="mdi:chevron-left" fontSize="25px" fontWeight="bold" />
              </IconButton>
              <Typography
                variant="overline"
                sx={{
                  fontSize: '16px',
                  textAlign: 'center',
                  color: 'inherit'
                }}
              >
                {getMonthYear()}
              </Typography>
              <IconButton
                sx={{
                  height: '50%',
                  backgroundColor: theme.palette.mode === 'dark' ? '#3D4156' : '#EFEFF0',
                  p: 0.5,
                  mt: 1
                }}
                size="small"
                color="secondary"
                onClick={handleNextMonth}
              >
                <Icon icon="mdi:chevron-right" fontSize="25px" fontWeight="bold" />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                justifyContent: 'center'
              }}
            >
              <CalendarDropdownBtn
                title={ethiopianMonthNames[currentMonth.getMonth()]}
                options={ethiopianMonthNames}
                isMonth={true}
                handleChange={(month: string) => {
                  const newDate = new EthiopianDate(currentMonth.getFullYear(), ethiopianMonthNames.indexOf(month), currentMonth.getDate());
                  setCurrentMonth(newDate);
                }}
                addNextYearOption={undefined}
                addPreviousYearOption={undefined}
              />
              <CalendarDropdownBtn
                isMonth={false}
                title={currentMonth.getFullYear().toString()}
                options={years.map((year) => year.toString())}
                addPreviousYearOption={() => {
                  const newYears = [...years];
                  newYears.unshift(years[0] - 1);
                  newYears.pop();
                  setYears(newYears);
                }}
                addNextYearOption={() => {
                  const newYears = [...years];
                  newYears.push(years[years.length - 1] + 1);
                  newYears.shift();
                  setYears(newYears);
                }}
                handleChange={(year: any) => {
                  const newDate = new EthiopianDate(Number(year), currentMonth.getMonth(), currentMonth.getDate());
                  setCurrentMonth(newDate);
                }}
              />
            </Box>
            <Grid container spacing={1} pr={3} pl={4}>
              {renderCalendarDays()}
            </Grid>
          </Box>
        </Menu>
      </Box>
    </ClickAwayListener>
  );
};

export default EthioCalendar;
