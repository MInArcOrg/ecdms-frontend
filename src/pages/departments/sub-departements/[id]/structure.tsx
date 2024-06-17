// ** MUI Imports
import { TabPanel } from '@mui/lab';

import TabRoutesWithId from '../../tab-routes-with-id';
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
        backgroundColor: '#EFF2F7',
        margin: 0,
        padding: 0
      }}
    >
      <StructureComponent viewAll={true} parentDepartment={parentDepartment} />
    </TabPanel>
  );
};

SubDepartemnts.getLayout = (page: ReactElement) => (
  <UserLayout>
    <CentersLayout value="5" routes={TabRoutesWithId}>
      {page}
    </CentersLayout>
  </UserLayout>
);

export default SubDepartemnts;
