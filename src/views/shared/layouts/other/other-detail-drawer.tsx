import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { isArray } from 'lodash';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants'; // Assuming standard grid spacing
import FileDrawer from 'src/views/components/custom/files-drawer';
import DescCollapse from 'src/views/pages/resources/details/desc-collapse';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';

interface DetailItem {
  title: string;
  value: string | React.ReactNode;
}

interface OtherDetailSidebarProps {
  show: boolean;
  toggleDrawer: () => void;
  data: DetailItem[];
  hasReference: boolean;
  id: string;
  title: string;
  fileType: string | string[];
}

const OtherDetailSidebar: React.FC<OtherDetailSidebarProps> = ({ show, toggleDrawer, data, hasReference, id, title, fileType }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <CustomSideDrawer handleClose={toggleDrawer} open={show} title={title}>
        {() => (
          <Box sx={{ p: 4, pt: 2 }}> {/* Added padding for better containment */}
            <Grid container spacing={gridSpacing}>
              {data.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <FormControl fullWidth variant="outlined">
                    <Typography
                      variant="body2" // Adjusted to body2 for detail text
                      sx={{
                        fontWeight: 600, // Slightly bolder for titles
                        mb: 0.5
                      }}
                    >
                      {t(item.title)}:
                    </Typography>

                    <Typography
                      variant="body1" // Adjusted for the value display
                      sx={{
                        wordBreak: 'break-word', // Ensure long content wraps
                        color: 'text.secondary' // Muted color for value
                      }}
                    >
                      {item.title === 'Description' && typeof item.value === 'string' ? (
                        <DescCollapse desc={item.value} />
                      ) : (
                        item.value
                      )}
                    </Typography>
                  </FormControl>
                  {/* Optional: Add a subtle divider between items */}
                  {index < data.length - 1 && <Divider sx={{ mt: 3, opacity: 0.5 }} />}
                </Grid>
              ))}
            </Grid>

            {hasReference && (
              <Fragment>
                <Divider sx={{ my: 4 }} /> {/* Clear separation for the file section */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.5,
                    px: 0 // Removed unnecessary margin/padding from the original Box
                  }}
                >
                  <Typography variant="body1" fontWeight={600} color="text.primary">
                    {t('Attachments')}
                  </Typography>

                  <Box>
                    {/* FileDrawer component is typically small/iconic, placed on the right */}
                    {
                      isArray(fileType) ? fileType.map((type) => (
                        <FileDrawer key={type} id={id} type={type.toString()} />
                      )) : <FileDrawer id={id} type={fileType.toString()} />
                    }
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  {t('Click the icon above to view all associated files.')}
                </Typography>
              </Fragment>
            )}
          </Box>
        )}
      </CustomSideDrawer>
    </Fragment>
  );
};

export default OtherDetailSidebar;