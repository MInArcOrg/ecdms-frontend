import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import JointVentureList from 'src/views/pages/stakeholders/details/joint-ventures';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function JointVentureIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.ORGANIZATION}
      activeSubMenuId={stakeholderOrganizationIds.generalInfo.jointVenture}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <JointVentureList model="stakeholder-joint-venture" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

JointVentureIndex.acl = {
  subject: 'jointventure',
  action: 'view'
};

export default JointVentureIndex;
