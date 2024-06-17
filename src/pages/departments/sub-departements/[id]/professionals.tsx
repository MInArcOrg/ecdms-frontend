// ** MUI Imports
import { TabPanel } from '@mui/lab';
import TabRoutesWithId from '../../tab-routes-with-id';
import UserLayout from 'src/layouts/UserLayout';
import Department from 'src/types/department/department';
import { ReactElement } from 'react';
import CentersLayout from 'src/views/pages/centers/centers-layout';
import ProfessionalList from 'src/views/pages/centers/Professional/professional-list';

const Professionals = ({ parentDepartment }: { parentDepartment: Department }) => {
  return (
    <TabPanel value="3" sx={{ margin: 0, padding: 0 }}>
      <ProfessionalList parentDepartment={parentDepartment} />
    </TabPanel>
  );
};

Professionals.getLayout = (page: ReactElement) => {
  return (
    <UserLayout>
      <CentersLayout value="3" routes={TabRoutesWithId}>
        {page}
      </CentersLayout>
    </UserLayout>
  );
};
Professionals.acl = {
  action: 'view_professional',
  subject: 'professional'
};

export default Professionals;
