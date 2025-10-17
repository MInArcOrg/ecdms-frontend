import { Box, Card, CardContent, Collapse, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import Translations from 'src/layouts/components/Translations';

interface MasterFlagAccordionMenuProps {
  activeModule: {
    id: string;
    name: string;
    flags?: { id: string; name: string }[];
  };
  masterDataItemsByFlag: Record<string, any[]>;
}

const MasterFlagAccordionMenu: React.FC<MasterFlagAccordionMenuProps> = ({ activeModule, masterDataItemsByFlag }) => {
  const router = useRouter();
  const { flag: activeFlagFromUrl } = router.query;
  const [openFlag, setOpenFlag] = useState<string | null>(activeFlagFromUrl as string);

  useEffect(() => {
    if (activeFlagFromUrl && openFlag !== activeFlagFromUrl) {
      setOpenFlag(activeFlagFromUrl as string);
    }
  }, [activeFlagFromUrl]);

  const handleFlagClick = (flagId: string) => {
    setOpenFlag(openFlag === flagId ? null : flagId);
  };

  const handleSubMenuItemClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Translations text={`master-data.${activeModule.id}`} />
        </Typography>
        {activeModule.flags?.map((item) => (
          <Box key={item.id}>
            <ListItemButton selected={openFlag === item.id} sx={{ borderRadius: '0.5rem', mb: 2 }} onClick={() => handleFlagClick(item.id)}>
              <ListItemText primary={<Translations text={item.name} />} />
              <Icon icon={openFlag === item.id ? 'tabler:chevron-down' : 'tabler:chevron-right'} />
            </ListItemButton>
            <Collapse in={openFlag === item.id} timeout="auto" unmountOnExit>
              {masterDataItemsByFlag[item.id]?.map((type: { id: string; path: string; title: string }) => (
                <ListItem key={type.id} sx={{ pb: 0.7, pt: 0 }}>
                  <ListItemButton
                    sx={{
                      borderRadius: '0.5rem',
                      '&.Mui-selected': { backgroundColor: 'primary.light', '&:hover': { backgroundColor: 'primary.light' } }
                    }}
                    selected={router.asPath.startsWith(type.path)}
                    onClick={() => handleSubMenuItemClick(type.path)}
                  >
                    <Icon icon="tabler:chevron-right" fontSize="1rem" />
                    <ListItemText primary={type.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </Collapse>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default MasterFlagAccordionMenu;
