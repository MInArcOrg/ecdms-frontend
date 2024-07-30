import { CardContent, ListItemButton, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';

interface SubMenuItem {
  id: number;
  path: string;
  title: string;
}

interface DetailSubMenuProps {
  subMenuItems: SubMenuItem[];
  activeSubMenu: number;
  setActiveSubMenu: (path: string) => void;
}

const DetailSubMenu: React.FC<DetailSubMenuProps> = ({ subMenuItems, activeSubMenu, setActiveSubMenu }) => {
  const { t } = useTranslation();

  return (
    <CardContent>
      {subMenuItems.map((item) => (
        <ListItemButton
          key={item.id}
          onClick={() => setActiveSubMenu(item.path)}
          sx={{
            borderRadius: '0.5rem',
            '&.Mui-selected': {
              backgroundColor: 'primary.light',
              color: '#fff',

              '&:hover': {
                backgroundColor: 'primary.light'
              }
            }
          }}
          selected={activeSubMenu === item.id}
        >
          <Icon fontSize={20} icon="tabler:chevron-right" />
          <ListItemText
            primaryTypographyProps={{
              style: { color: `${activeSubMenu === item.id ? '#fff' : ''}` },
              fontSize: '0.9rem'
            }}
            primary={t(item.title)}
          />
        </ListItemButton>
      ))}
    </CardContent>
  );
};

export default DetailSubMenu;
