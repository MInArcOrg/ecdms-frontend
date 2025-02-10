import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(sub-menu-items)';
import JointVentureCompanyList from 'src/views/pages/stakeholders/details/joint-venture-company';

function JointVentureCompanyIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={0} activeSubMenu={4} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <JointVentureCompanyList model="joint-venture-company" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

JointVentureCompanyIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default JointVentureCompanyIndex;
