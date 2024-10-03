import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import React, { Fragment } from 'react';

import { useTranslation } from 'react-i18next';
import FileDrawer from 'src/views/components/custom/files-drawer';
import DescCollapse from 'src/views/pages/resources/detail/desc-collapse';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';

interface DetailItem {
  title: string;
  value: string;
}

interface OtherDetailSidebarProps {
  show: boolean;
  toggleDrawer: () => void;
  data: DetailItem[];
  hasReference: boolean;
  id: string;
  title: string;
  fileType: string;
}

const OtherDetailSidebar: React.FC<OtherDetailSidebarProps> = ({ show, toggleDrawer, data, hasReference, id, title, fileType }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <CustomSideDrawer handleClose={toggleDrawer} open={show} title={title}>
        {() => (
          <Fragment>
            {data.map((item, index) => (
              <FormControl fullWidth variant="outlined" sx={{ mb: 3 }} key={index}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <strong>{t(item.title)}:</strong>
                  {item.title === 'Description' ? <DescCollapse desc={item.value} /> : <span>{item.value}</span>}
                </Typography>
              </FormControl>
            ))}

            {hasReference && (
              <Box display="flex" justifyContent="space-between" alignItems="center" m={2}>
                <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                  {`${t('Reference')} ${t('File')}`}
                </Typography>
                <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                  <FileDrawer id={id} type={fileType} />
                </Typography>
              </Box>
            )}
          </Fragment>
        )}
      </CustomSideDrawer>
    </Fragment>
  );
};

export default OtherDetailSidebar;
