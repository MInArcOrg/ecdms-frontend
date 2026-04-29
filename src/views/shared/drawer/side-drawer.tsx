import React from 'react';
import { Box, BoxProps, Drawer, IconButton, styled, Typography, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import DataCollectionGuideList from '../data-collection-guide';

interface CustomSideDrawerProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  translatedTitle?: string;
  children: () => JSX.Element;
  width?: number; // Optional width prop
  model?: string;
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const CustomSideDrawer: React.FC<CustomSideDrawerProps> = ({ open, handleClose, title, translatedTitle, children, width, model }) => {
  const { t: transl } = useTranslation();
  const [tab, setTab] = React.useState(0);

  // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setTab(newValue);
  // };

  return (
    <div className="customizer">
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: width ? `min(${width}px, 100%)` : { xs: '100%', sm: 400 }
          }
        }}
      >
        <Header>
          <Typography variant="h5">{translatedTitle || transl(title || '')}</Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              p: '0.438rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: (theme) => `rgba(${theme.palette.customColors.main}, 0.16)`
              }
            }}
          >
            <Icon icon="tabler:x" fontSize="1.125rem" />
          </IconButton>
        </Header>
        <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
          {/* {model ? (
            <>
              <Tabs value={tab} onChange={handleTabChange} aria-label="side drawer tabs">
                <Tab label={transl('Form')} />
                <Tab label={transl('Information')} />
              </Tabs>
              <Box sx={{ mt: 2 }}>
                {tab === 0 && <Box>{children()}</Box>}
                {tab === 1 && <DataCollectionGuideList model={model} />}
              </Box>
            </>
          ) : ( */}
            <Box>{children()}</Box>
          {/* )} */}
        </Box>
      </Drawer>
    </div>
  );
};

export default CustomSideDrawer;
