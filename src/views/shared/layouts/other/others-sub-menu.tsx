import { Icon } from '@iconify/react';
import { Box, CardContent, Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import modelMenuApiService from 'src/services/general/model-menu-service';
import LoadingPlaceholder from 'src/views/components/loader';

// Define types for the props
interface Route {
  id: number;
  title: string;
  path: string;
  model: string;
}

interface SubMenuItem {
  id: number;
  title: string;
  icon: string;
  routes: Route[];
}

interface OtherSubMenuProps {
  typeId: string;
  subMenuItems: SubMenuItem[];
  activeSubMenu?: number | null; // Ensure it's allowed to be null
  setActiveType: (path: string) => void;
  activeType?: number;
}

// Define type for the state
type OpenState = number | null;

const OtherSubMenu: React.FC<OtherSubMenuProps> = ({ subMenuItems, activeSubMenu, setActiveType, activeType, typeId }) => {
  const { data: models, isLoading: loading } = useQuery({
    queryKey: ['module-models', typeId],
    queryFn: () => modelMenuApiService.getByTypeId(typeId, { pagination: { pageSize: 100, page: 1 } })
  });
  const { t } = useTranslation();

  const [open, setOpen] = useState<OpenState>(activeType ? activeType : null);

  const handleClick = (id: number) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  const ItemComponent: React.FC<{ route: Route; item: SubMenuItem }> = ({ route, item }) => (
    <ListItemButton
      selected={activeSubMenu === route.id}
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
      onClick={() => {
        setActiveType(route.path);
      }}
    >
      <Icon icon="tabler:chevron-right" fontSize={15} />
      <ListItemText
        primary={t(route.title)}
        primaryTypographyProps={{
          style: {
            color: `${activeType === item.id && activeSubMenu === route.id ? '#fff' : ''}`
          },
          fontSize: '0.9rem'
        }}
      />
    </ListItemButton>
  );

  return (
    <Fragment>
      {loading && <LoadingPlaceholder />}
      {models && models.length > 0 ? (
        subMenuItems.map((item, index) => {
          const routes = item.routes.filter((route) => route.model && models?.find((model) => model.model === route.model));

          return (
            routes.length > 0 && (
              <CardContent key={index}>
                <ListItemButton
                  onClick={() => {
                    handleClick(item.id);
                  }}
                  key={index}
                  selected={activeType === item.id}
                  sx={{
                    borderRadius: '0.5rem',
                    marginBottom: '0.5rem'
                  }}
                >
                  <Box display="flex" alignItems="end" mr={1}>
                    <Icon icon={`${item.icon}`} fontSize="1.2rem" />
                  </Box>
                  <ListItemText primary={t(item.title)} />
                </ListItemButton>
                <Collapse in={open === item.id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ px: 5 }}>
                    {!loading && (
                      <Fragment>
                        {routes.map((route, index) => (
                          <ItemComponent key={index} route={route} item={item} />
                        ))}
                      </Fragment>
                    )}
                  </List>
                </Collapse>
              </CardContent>
            )
          );
        })
      ) : (
        <>No model found {models}</>
      )}
    </Fragment>
  );
};

export default OtherSubMenu;
