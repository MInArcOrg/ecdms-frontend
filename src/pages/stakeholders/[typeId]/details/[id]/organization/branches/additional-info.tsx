import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from '../(sub-menu-items)';
import BranchAdditionalInformationList from 'src/views/pages/stakeholders/details/branch-additional-information';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import { stakeholderOrganizationIds } from '../(sub-menu-items)';

function BranchAdditionalInformationIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenuId={stakeholderMenuIds.ORGANIZATION} activeSubMenuId={stakeholderOrganizationIds.branches.additionalInfo} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <BranchAdditionalInformationList stakeholderId={String(id)}  />
    </StakeholderLayout>
  );
}

BranchAdditionalInformationIndex.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default BranchAdditionalInformationIndex;
