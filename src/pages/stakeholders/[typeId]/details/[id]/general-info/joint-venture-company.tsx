import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import subMenuItems from './(sub-menu-items)';
import JointVentureCompanyList from 'src/views/pages/stakeholders/details/joint-venture-company';

function JointVentureCompanyIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ResourceLayout activeMenu={0} activeSubMenu={4} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <JointVentureCompanyList model="joint-venture-company" stakeholderId={String(id)} typeId={String(typeId)} />
    </ResourceLayout>
  );
}

JointVentureCompanyIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default JointVentureCompanyIndex;
