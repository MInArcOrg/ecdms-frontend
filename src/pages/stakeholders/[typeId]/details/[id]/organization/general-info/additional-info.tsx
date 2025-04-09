import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import StakeholderAdditionaInfolList from 'src/views/pages/stakeholders/details/stakeholder-additional-info';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function StakeholderManagerIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenuId={stakeholderMenuIds.ORGANIZATION} activeSubMenuId={stakeholderOrganizationIds.generalInfo.additionalInfo} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderAdditionaInfolList model="stakeholder-additional-info" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

StakeholderManagerIndex.acl = {
  subject: 'stakeholderadditionalinformation',
  action: 'view_stakeholderadditionalinformation'
};

export default StakeholderManagerIndex;
