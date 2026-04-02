import { Card, FormControl, Grid, ListItemButton, ListItemText, MenuItem, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Can from 'src/layouts/components/acl/Can';

function DetailMenu({
  id,
  menuItems,
  activeMenu,
  setActiveMenu,
  goBack,
  typeid
}: {
  id?: string;
  menuItems: { id: number; title: string; path: string; subject?: string }[];
  activeMenu: string;
  setActiveMenu: (path: string) => void;
  goBack?: () => void;
  typeid?: string;
}) {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
      {desktop ? (
        <Grid container gap={2} sx={{ ml: 3 }}>
          {menuItems.map((item) => (
            // <Can do={item?.subject} key={item.id} on={item?.subject}>
            <Grid item>
              <ListItemButton
                onClick={() => setActiveMenu(item.path)}
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
                selected={activeMenu === item.path}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Grid>
            // </Can>
          ))}
        </Grid>
      ) : (
        <FormControl sx={{ my: 2 }}>
          <Select
            id="demo-simple-select"
            value={activeMenu}
            onChange={(e) => {
              setActiveMenu(String(e.target.value));
            }}
          >
            {menuItems.map((item) => (
              <MenuItem value={item.path} key={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Card>
  );
}

export default DetailMenu;
