// ** MUI Imports
import CentersLayout from 'src/views/components/centers/CentersLayout'
import { TabPanel } from '@mui/lab'
import TabRoutesWithId from '../../tab-routes-with-id'
import ProfessionalTable from 'src/views/components/centers/Professional/ProfessionalTable'
import UserLayout from 'src/layouts/UserLayout'

const Professionals = ({ parentDepartment }) => {
  return (
    <TabPanel value='3'>
      <ProfessionalTable parentDepartment={parentDepartment} />
    </TabPanel>
  )
}

Professionals.getLayout = page => {
  return (
    <UserLayout>
      <CentersLayout value='3' routes={TabRoutesWithId}>
        {page}
      </CentersLayout>
    </UserLayout>
  )
}
Professionals.acl = {
  action: 'view_professional',
  subject: 'professional'
}

export default Professionals
