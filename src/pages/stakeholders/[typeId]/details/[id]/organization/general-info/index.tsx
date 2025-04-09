import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function StakeholderGeneralInoIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenuId={stakeholderMenuIds.ORGANIZATION} activeSubMenuId={stakeholderOrganizationIds.generalInfo.generalInfo} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <></>
    </StakeholderLayout>
  );
}

StakeholderGeneralInoIndex.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default StakeholderGeneralInoIndex;
