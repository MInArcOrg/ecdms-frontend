import { Card, CardContent, Collapse, ListItem, ListItemButton, ListItemText, Typography, Box } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { useRouter } from 'next/router';
import { ReactElement, useState, Fragment } from 'react';
import Translations from 'src/layouts/components/Translations'; // Ensure this path is correct
import menuItems from 'src/pages/master-data/general/(menuItems)'; // Ensure this path is correct
import { Icon } from '@iconify/react'; // Ensure you have iconify/react installed
import { useTranslation } from 'react-i18next';

function GeneralLayout({ children }: { children: ReactElement }) {
  const router = useRouter();
  const { t } = useTranslation();
  const initialOpenId = router.asPath.includes('project') ? 2 : router.asPath.includes('resource') ? 3 : 1;
  const [openId, setOpenId] = useState(initialOpenId);

  const handleMenuItemClick = (id: number) => {
    setOpenId(id);
  };

  const handleSubMenuItemClick = (path: string) => {
    router.push(path);
  };

  const MenuItem = ({ item }: { item: any }) => (
    <Box key={item.id}>
      <ListItemButton selected={openId === item.id} sx={{ borderRadius: '0.5rem', mb: 2 }} onClick={() => handleMenuItemClick(item.id)}>
        <ListItemText primary={<Translations text={item.title} />} />
        <Icon icon={openId === item.id ? 'tabler:chevron-down' : 'tabler:chevron-up'} />
      </ListItemButton>
      <Collapse in={openId === item.id} timeout="auto" unmountOnExit>
        {item.children.map((type: any) => (
          <ListItem key={type.id} sx={{ pb: 0.7, pt: 0 }}>
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
              selected={router.asPath === type.path}
              onClick={() => handleSubMenuItemClick(type.path)}
            >
              <Icon icon="tabler:chevron-right" fontSize="1rem" />
              <ListItemText primary={type.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </Collapse>
    </Box>
  );

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Translations text="Types" />
              </Typography>
              {menuItems(t).map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={9}>
          {children}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default GeneralLayout;
