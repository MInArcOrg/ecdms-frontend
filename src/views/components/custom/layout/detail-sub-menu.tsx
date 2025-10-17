import { Box, CardContent, Collapse, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

interface DetailSubMenuProps {
  subMenuItems: DetailSubMenuItem[];
  activeSubMenuId?: string;
  setActiveSubMenu: (path: string) => void;
}

const DetailSubMenu: React.FC<DetailSubMenuProps> = ({ subMenuItems, activeSubMenuId, setActiveSubMenu }) => {
  const { t } = useTranslation();
  const initialOpenId = subMenuItems.find((item) => item.subItems?.some((subItem) => subItem.id === activeSubMenuId))?.id || null;
  const [openId, setOpenId] = useState<string | null>(initialOpenId);

  const handleMenuItemClick = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleSubMenuItemClick = (path: string) => {
    setActiveSubMenu(path);
  };

  return (
    <CardContent>
      {subMenuItems.map((item) => {
        const isParentActive = item.subItems?.some((subItem) => subItem.id === activeSubMenuId) || activeSubMenuId === item.id;
        const hasSubItems = !!item.subItems && item.subItems.length > 0;

        return (
          <Box key={item.id}>
            <ListItemButton
              selected={openId === item.id || isParentActive}
              sx={{ borderRadius: '0.5rem', mb: 2 }}
              onClick={() => {
                if (hasSubItems) {
                  handleMenuItemClick(item.id);
                } else if (item.path) {
                  setActiveSubMenu(item.path);
                }
              }}
            >
              <ListItemText primary={t(item.title)} />
              {hasSubItems ? <Icon icon={openId === item.id ? 'tabler:chevron-down' : 'tabler:chevron-up'} /> : null}
            </ListItemButton>
            <Collapse in={openId === item.id} timeout="auto" unmountOnExit>
              {item.subItems &&
                item.subItems.map((subItem) => (
                  <ListItem key={subItem.id} sx={{ pb: 0.7, pt: 0 }}>
                    <ListItemButton
                      sx={{
                        borderRadius: '0.5rem',
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                          '&:hover': {
                            backgroundColor: 'primary.light'
                          }
                        }
                      }}
                      selected={activeSubMenuId === subItem.id}
                      onClick={() => handleSubMenuItemClick(subItem.path)}
                    >
                      <Icon icon="tabler:chevron-right" fontSize="1rem" />
                      <ListItemText primary={t(subItem.title)} />
                    </ListItemButton>
                  </ListItem>
                ))}
            </Collapse>
          </Box>
        );
      })}
    </CardContent>
  );
};

export default DetailSubMenu;
