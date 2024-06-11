// ** MUI Imports
import CentersLayout from 'src/views/components/centers/CentersLayout'
import { TabPanel } from '@mui/lab'
import TabRoutesWithId from '../../tab-routes-with-id'
import PositionTable from 'src/views/components/centers/Position/PositionTable'
import UserLayout from 'src/layouts/UserLayout'

const Positions = ({ parentDepartment }) => {
  return (
    <TabPanel value='2'>
      <PositionTable parentDepartment={parentDepartment} />
    </TabPanel>
  )
}

Positions.getLayout = page => {
  return (
    <UserLayout>
      <CentersLayout value='2' routes={TabRoutesWithId}>
        {page}
      </CentersLayout>
    </UserLayout>
  )
}
Positions.acl = {
  action: 'view_position',
  subject: 'position'
}

export default Positions
