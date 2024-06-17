// ** MUI Imports
import { TabPanel } from '@mui/lab';
import TabsRoute from './tab-routes';
import UserLayout from 'src/layouts/UserLayout';
import { ReactElement } from 'react';
import CentersLayout from 'src/views/pages/centers/centers-layout';
import Document from 'src/views/pages/centers/document';

const centerDocuments = () => {
  return (
    <TabPanel value="4">
      <Document />
    </TabPanel>
  );
};

centerDocuments.getLayout = (page: ReactElement) => (
  <UserLayout>
    <CentersLayout value="4" routes={TabsRoute}>
      {page}
    </CentersLayout>
  </UserLayout>
);

export default centerDocuments;
