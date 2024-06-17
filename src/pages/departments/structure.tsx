// ** MUI Imports
import { TabPanel } from '@mui/lab';

import TabsRoute from './tab-routes';
import UserLayout from 'src/layouts/UserLayout';
import StructureComponent from 'src/views/pages/centers/structure-component';
import CentersLayout from 'src/views/pages/centers/centers-layout';
import { ReactElement } from 'react';
import Department from 'src/types/department/department';

const SubDepartemnts = ({ parentDepartment }: { parentDepartment: Department }) => {
  return (
    <TabPanel
      value="5"
      sx={{
        backgroundColor: '#EFF2F7'
      }}
    >
      <StructureComponent viewAll={true} parentDepartment={parentDepartment} />
    </TabPanel>
  );
};

SubDepartemnts.getLayout = (page: ReactElement) => (
  <UserLayout>
    <CentersLayout value="5" routes={TabsRoute}>
      {page}
    </CentersLayout>
  </UserLayout>
);

export default SubDepartemnts;
