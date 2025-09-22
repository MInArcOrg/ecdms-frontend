import {
  Card,
  FormControl,
  Grid,
  Select,
  ListItemButton,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Icon from "src/@core/components/icon";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Can from "src/layouts/components/acl/Can";
import ProjectInfo from "../../../pages/projects/detail/project-info-drawer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DetailMenuItem } from "src/types/layouts/detail-layout";

interface DetailMenuProps {
  id: string;
  menuItems: DetailMenuItem[];
  activeMenuId: string;
  setActiveMenu: (path: string) => void;
  goBack: () => void;
  typeId: string;
  isProject?: boolean;
}

const DetailMenu: React.FC<DetailMenuProps> = ({
  id,
  menuItems,
  activeMenuId,
  setActiveMenu,
  goBack,
  typeId,
  isProject = false,
}) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const { t } = useTranslation();

  const [detailForm, setDetailForm] = useState(false);

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      {isProject && detailForm && (
        <ProjectInfo
          show={detailForm}
          toggleDrawer={() => setDetailForm(!detailForm)}
          title="Project Info"
          id={id}
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          pl: 3,
        }}
      >
        <Icon
          icon="tabler:arrow-left"
          fontSize={20}
          cursor="pointer"
          onClick={() => goBack()}
        />
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setDetailForm(true);
          }}
        >
          #{id?.substr(0, 8)}
        </Typography>
      </Box>
      {desktop ? (
        <Grid container gap={2} sx={{ ml: 3 }}>
          {menuItems.map((item) => (
            <Can do={item.action} key={item.id} on={item.subject}>
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
                    },
                  }}
                  selected={activeMenuId === item.id}
                >
                  <ListItemText primary={t(item.title)} />
                </ListItemButton>
              </Grid>
            </Can>
          ))}
        </Grid>
      ) : (
        <FormControl sx={{ my: 2 }}>
          <Select
            id="demo-simple-select"
            defaultValue={activeMenuId}
            value={activeMenuId}
            onChange={(e) => {
              const path =
                menuItems.find((item) => item.id === e.target.value)?.path ||
                "";
              setActiveMenu(path);
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

export default DetailMenu;
