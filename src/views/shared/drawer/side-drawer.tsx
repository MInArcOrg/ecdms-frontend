import { Box, BoxProps, Drawer, IconButton, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';

interface CustomSideDrawerProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: () => JSX.Element;
}
const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));
const CustomSideDrawer: React.FC<CustomSideDrawerProps> = ({ open, handleClose, title, children }) => {
  const { t: transl } = useTranslation();
  return (
    <div className="customizer">
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <Header>
          <Typography variant="h5">{transl(title)}</Typography>
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
          <Box>{children()}</Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default CustomSideDrawer;
