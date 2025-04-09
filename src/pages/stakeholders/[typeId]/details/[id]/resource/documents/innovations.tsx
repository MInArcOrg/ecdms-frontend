import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderResourceIds } from '../(sub-menu-items)';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function StakeholderStrategyIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenuId={stakeholderMenuIds.RESOURCE} activeSubMenuId={stakeholderResourceIds.documents.innovations} subMenuItems={subMenuItems(id as string, typeId as string)}>
        <>
        //strategies need to be added here
        </>
    </StakeholderLayout>
  );
}

StakeholderStrategyIndex.acl = {
  action: 'view',
  subject: 'stakeholder'
};

export default StakeholderStrategyIndex;
