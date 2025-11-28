import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import subMenuItems, { stakeholderProjectIds } from '../(sub-menu-items)';
import StakehlderProjectList from 'src/views/pages/stakeholders/details/stakeholder-project';

function BranchAdditionalInformationIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.PROJECTS}
      activeSubMenuId={stakeholderProjectIds.projects.projects}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakehlderProjectList stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

BranchAdditionalInformationIndex.acl = {
  subject: 'stakeholder',
  action: 'view'
};

export default BranchAdditionalInformationIndex;
