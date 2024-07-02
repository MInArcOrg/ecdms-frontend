import { useState, MouseEvent, FC } from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material';

interface CalendarDropdownBtnProps {
  options: string[];
  title: string;
  handleChange: (selectedOption: string) => void;
  isMonth: boolean;
  addNextYearOption?: () => void;
  addPreviousYearOption?: () => void;
}

const CalendarDropdownBtn: FC<CalendarDropdownBtnProps> = ({
  options,
  title,
  handleChange,
  isMonth,
  addNextYearOption,
  addPreviousYearOption
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (event: MouseEvent<HTMLElement>) => {
    handleChange(event.currentTarget.textContent || '');
    handleClose();
  };

  return (
    <div>
      <Button
        variant="text"
        color="secondary"
        aria-controls="dropdown-button"
        aria-haspopup="true"
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.mode === 'dark' ? '#cccccc' : '#737373'
          }
        }}
        onClick={handleClick}
      >
        {title} <Icon icon="mdi:chevron-down" fontSize="24px" />
      </Button>
      <Menu
        keepMounted
        id="dropdown-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        sx={{ alignItems: 'center', textAlign: 'center', mt: '1rem' }}
      >
        {!isMonth && (
          <MenuItem
            sx={{
              fontSize: '14px',
              px: 10,
              py: 1,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white'
              }
            }}
            onClick={addPreviousYearOption}
          >
            <Icon icon="mdi:chevron-up" fontSize="24px" />
          </MenuItem>
        )}
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={handleOptionClick}
            sx={{
              fontSize: '14px',
              backgroundColor: option === title ? 'primary.main' : 'transparent',
              color: option === title ? 'white' : 'inherit',
              px: 9,
              py: 1.2,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white'
              }
            }}
          >
            {option}
          </MenuItem>
        ))}
        {!isMonth && (
          <MenuItem
            sx={{
              fontSize: '14px',
              px: 10,
              py: 1,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white'
              }
            }}
            onClick={addNextYearOption}
          >
            <Icon icon="mdi:chevron-down" fontSize="24px" />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default CalendarDropdownBtn;
