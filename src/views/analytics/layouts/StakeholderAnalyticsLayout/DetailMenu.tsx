import {
  Card,
  FormControl,
  Grid,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Can from "src/layouts/components/acl/Can";

interface MenuItemType {
  id: number;
  title: string;
  action: string;
  subject: string;
  path: string;
}

interface DetailMenuProps {
  id?: number;
  menuItems: MenuItemType[];
  activeMenu: string;
  setActiveMenu: (path: string) => void;
  goBack?: () => void;
  typeid?: string;
}

const DetailMenu = ({
  id,
  menuItems,
  activeMenu,
  setActiveMenu,
  goBack,
  typeid,
}: DetailMenuProps) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      {desktop ? (
        <Grid container gap={2} sx={{ ml: 3 }}>
          {menuItems.map((item) => (
            <Can key={item.id} do={item.action} on={item.subject}>
              <Grid item>
                <ListItemButton
                  onClick={() => setActiveMenu(item.path)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 2,
                    px: 3,
                    borderRadius: 1,
                    "&.Mui-selected": {
                      textDecoration: "underline",
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                  selected={activeMenu === item.path}
                >
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: activeMenu === item.path ? 600 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              </Grid>
            </Can>
          ))}
        </Grid>
      ) : (
        <FormControl sx={{ my: 2, width: "100%" }}>
          <Select
            id="detail-menu-select"
            value={
              menuItems.find((item) => item.path === activeMenu)?.id || ""
            }
            onChange={(e) => {
              const selectedItem = menuItems.find(
                (item) => item.id === e.target.value
              );
              if (selectedItem) setActiveMenu(selectedItem.path);
            }}
          >
            {menuItems.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Card>
  );
};

export default DetailMenu;
