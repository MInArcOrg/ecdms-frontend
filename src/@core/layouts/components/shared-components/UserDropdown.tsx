// ** React Imports
import { Fragment, SyntheticEvent, useState } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** MUI Imports
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Context
import { useAuth } from 'src/hooks/useAuth';

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext';
import User from 'src/types/admin/user';
import UserAvatar from 'src/views/admin/user/user-avatar';
import UserProfileSmall from 'src/views/admin/user/user-profile-small';
import { IconButton } from '@mui/material';
import Customizer from 'src/@core/components/customizer';

interface Props {
  settings: Settings;
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}));

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}));

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props;

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  // ** Hooks
  const router = useRouter();

  const { logout, user } = useAuth();
  // ** Vars
  const { direction } = settings;

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      fontSize: '1.5rem',
      color: 'text.secondary'
    }
  };

  const handleLogout = () => {
    logout();
    handleDropdownClose();
  };

  const [openSetting, setOpenSetting] = useState(false);
  const toggleSettingDrawer = () => {
    setOpenSetting(!openSetting);
  }
  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <UserAvatar user={user as User} onClick={handleDropdownOpen} sx={{ width: 38, height: 38 }} />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
      >
        <Box sx={{ py: 1.75, px: 6 }}>
          <UserProfileSmall user={user as User} isMyProfile={true} />
        </Box>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />

        <MenuItemStyled sx={{ p: 0 }} onClick={toggleSettingDrawer}>
          <Box sx={styles}>
            <Icon icon="tabler:settings" />
            Settings
          </Box>
          <Customizer open={openSetting} handleToggle={toggleSettingDrawer} />
        </MenuItemStyled>

        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={handleLogout}>
          <Box sx={styles}>
            <Icon icon="tabler:logout" />
            Sign Out
          </Box>
        </MenuItemStyled>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
