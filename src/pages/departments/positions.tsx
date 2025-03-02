// ** MUI Imports
import { TabPanel } from '@mui/lab';
import TabsRoute from './tab-routes';
import UserLayout from 'src/layouts/UserLayout';
import Department from 'src/types/department/department';
import CentersLayout from 'src/views/pages/centers/centers-layout';
import PositionList from 'src/views/pages/centers/Position/position-list';
import { ReactElement } from 'react';

const Positions = ({ parentDepartment }: { parentDepartment: Department }) => {
  return (
    <TabPanel value="2" sx={{ margin: 0, padding: 0 }}>
      <PositionList parentDepartment={parentDepartment} />
    </TabPanel>
  );
};

Positions.getLayout = (page: ReactElement) => (
  <UserLayout>
    <CentersLayout value="2" routes={TabsRoute}>
      {page}
    </CentersLayout>
  </UserLayout>
);
Positions.acl = {
  action: 'view_position',
  subject: 'position'
};

export default Positions;
