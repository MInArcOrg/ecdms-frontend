import { useRouter } from 'next/router';
import OtherLayout from 'src/views/pages/projects/detail/other/layouts/other-layout';
import subMenuItems from './(subMenuItems)';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;
  const baseUrl = `/projects/${typeId}/details/${id}/other`;
  const activeMenu = 8;

  return (
    <OtherLayout activeMenu={activeMenu} subMenuItems={subMenuItems} baseUrl={baseUrl}>
      <></>
    </OtherLayout>
  );
}

Index.acl = {
  action: 'view_other',
  subject: 'other'
};

export default Index;
