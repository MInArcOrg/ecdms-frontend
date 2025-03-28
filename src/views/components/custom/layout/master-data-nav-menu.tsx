import { Card, FormControl, Grid, ListItemButton, ListItemText, MenuItem, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

interface MasterDataMenu {
  id: string;
  title: string;
}
interface MasterDataNavMenuProps {
  menuItems: MasterDataMenu[];
  activeMenu: MasterDataMenu;
  setActiveMenu: (id: string) => void;
}

const MasterDataNavMenu: React.FC<MasterDataNavMenuProps> = ({ menuItems, activeMenu, setActiveMenu }) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const { t } = useTranslation();


  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          pl: 3
        }}
      >

      </Box>
      {desktop ? (
        <Grid container gap={2} sx={{ ml: 3 }}>
          {menuItems.map((item) => (
            <Grid item key={item.id}>
              <ListItemButton
                onClick={() => setActiveMenu(item?.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 2,
                  px: 3,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    textDecoration: 'underline'
                  }
                }}
                selected={activeMenu.id === item.id}
              >
                <ListItemText primary={t(item.title)} />
              </ListItemButton>
            </Grid>
          ))}
        </Grid>
      ) : (
        <FormControl sx={{ my: 2 }}>
          <Select
            id="demo-simple-select"
            defaultValue={activeMenu}
            value={activeMenu}
            onChange={(e) => {
              const itemId = menuItems.find((item) => item.id === e.target.value)?.id || '';
              setActiveMenu(itemId);
            }}
          >
            {menuItems.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {t(item.title)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Card>
  );
};

export default MasterDataNavMenu;
