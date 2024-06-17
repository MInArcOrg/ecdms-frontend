// ** MUI Imports
import { TabPanel } from '@mui/lab';
import TabRoutesWithId from '../../tab-routes-with-id';
import UserLayout from 'src/layouts/UserLayout';
import Department from 'src/types/department/department';
import { ReactElement } from 'react';
import PositionList from 'src/views/pages/centers/Position/position-list';
import CentersLayout from 'src/views/pages/centers/centers-layout';

const Positions = ({ parentDepartment }: { parentDepartment: Department }) => {
  return (
    <TabPanel value="2" sx={{ margin: 0, padding: 0 }}>
      <PositionList parentDepartment={parentDepartment} />
    </TabPanel>
  );
};

Positions.getLayout = (page: ReactElement) => {
  return (
    <UserLayout>
      <CentersLayout value="2" routes={TabRoutesWithId}>
        {page}
      </CentersLayout>
    </UserLayout>
  );
};
Positions.acl = {
  action: 'view_position',
  subject: 'position'
};

export default Positions;
