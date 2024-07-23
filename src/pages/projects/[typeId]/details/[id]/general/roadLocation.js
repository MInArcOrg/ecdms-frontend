import { useState } from 'react'
import { useRouter } from 'next/router'
import ProjectLayout from 'src/views/components/custom/projects/ProjectLayout'
import subMenuItems from './(subMenuItems)'
import { Box } from '@mui/material'
import { Icon } from '@iconify/react'
import DynamicLocationForm from 'src/views/components/forms/projects/DynamicLocationForm'

function RoadLocation() {
  const router = useRouter()
  const { id, typeid } = router.query
  const [detailForm, setDetailForm] = useState(false)
  const [show, setShow] = useState(false)

  return (
    <ProjectLayout
      id={id}
      toggleForm={setDetailForm}
      activeMenu={0}
      activeSubMenu={4}
      subMenuItems={subMenuItems(id, typeid)}
    >
      {show && (
        <DynamicLocationForm
          show={show}
          toggleDrawer={() => setShow(!show)}
          title='Road Location'
          handleFormSubmit={() => {}}
        />
      )}

      <Box
        alignSelf='end'
        display='flex'
        justifyContent='flex-end'
        mb={3}
        sx={{
          cursor: 'pointer'
        }}
      >
        <Icon icon='mdi:plus' width='25' height='25' onClick={() => setShow(true)} />
      </Box>
    </ProjectLayout>
  )
}
RoadLocation.acl = {
  subject: 'projectinfo',
  action: 'view_projectinfo'
}

export default RoadLocation
