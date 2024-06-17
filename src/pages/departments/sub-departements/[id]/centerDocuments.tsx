// ** MUI Imports
import { TabPanel } from '@mui/lab';
import TabRoutesWithId from '../../tab-routes-with-id';
import UserLayout from 'src/layouts/UserLayout';
import Document from 'src/views/pages/centers/document';
import CentersLayout from 'src/views/pages/centers/centers-layout';
import { ReactElement } from 'react';

const centerDocument = () => {
  return (
    <TabPanel value="4" sx={{ margin: 0, padding: 0 }}>
      <Document />
    </TabPanel>
  );
};

centerDocument.getLayout = (page: ReactElement) => {
  return (
    <UserLayout>
      <CentersLayout value="4" routes={TabRoutesWithId}>
        {page}
      </CentersLayout>
    </UserLayout>
  );
};

export default centerDocument;
