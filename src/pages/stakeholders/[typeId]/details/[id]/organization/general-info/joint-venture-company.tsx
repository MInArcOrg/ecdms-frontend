import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import JointVentureCompanyList from 'src/views/pages/stakeholders/details/joint-venture-company';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function JointVentureCompanyIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenuId={stakeholderMenuIds.ORGANIZATION} activeSubMenuId={stakeholderOrganizationIds.generalInfo.jointVentureCompany} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <JointVentureCompanyList model="joint-venture-company" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

JointVentureCompanyIndex.acl = {
  subject: 'jointventurecompany',
  action: 'view_jointventurecompany'
};

export default JointVentureCompanyIndex;
