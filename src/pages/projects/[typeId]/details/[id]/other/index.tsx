import OtherLayout from 'src/views/pages/projects/detail/other/layouts/other-layout'
import subMenuItems from './(subMenuItems)'

function Index() {
  return (
    <OtherLayout activeMenu={8} activeSubMenu={1} subMenuItems={subMenuItems}>
        <></>
    </OtherLayout>
  )
}

Index.acl = {
  action: 'view_other',
  subject: 'other',
}

export default Index
