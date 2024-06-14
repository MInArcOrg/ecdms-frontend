// ** MUI Imports
import { TabPanel } from '@mui/lab';
import TabsRoute from './tab-routes';
import UserLayout from 'src/layouts/UserLayout';
import { ReactElement } from 'react';
import Department from 'src/types/department/department';
import ProfessionalList from 'src/views/pages/centers/Professional/professional-list';
import CentersLayout from 'src/views/pages/centers/centers-layout';

const Professionals = ({ parentDepartment }: { parentDepartment: Department }) => {
  return (
    <TabPanel value="3" sx={{ margin: 0, padding: 0 }}>
      <ProfessionalList parentDepartment={parentDepartment} />
    </TabPanel>
  );
};

Professionals.getLayout = (page: ReactElement) => (
  <UserLayout>
    <CentersLayout value="3" routes={TabsRoute}>
      {page}
    </CentersLayout>
  </UserLayout>
);
Professionals.acl = {
  action: 'view_professional',
  subject: 'professional'
};

export default Professionals;
