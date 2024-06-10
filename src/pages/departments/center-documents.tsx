// ** MUI Imports
import { TabPanel } from '@mui/lab';
import TabsRoute from './tab-routes';
import UserLayout from 'src/layouts/UserLayout';
import { ReactNode } from 'react';
import Document from 'src/views/pages/centers/Document';
import CentersLayout from 'src/views/pages/centers/CentersLayout';

const centerDocuments = () => {
  return (
    <TabPanel value="4">
      <Document />
    </TabPanel>
  );
};

centerDocuments.getLayout = (page: ReactNode) => (
  <UserLayout>
    <CentersLayout value="4" routes={TabsRoute}>
      {page}
    </CentersLayout>
  </UserLayout>
);

export default centerDocuments;
