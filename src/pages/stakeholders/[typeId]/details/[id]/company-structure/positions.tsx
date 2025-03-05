import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import StakeholderPositionList from 'src/views/pages/stakeholders/details/stakeholder-positions';
import subMenuItems from './(sub-menu-items)';

function StakeholderPositionIndex() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <StakeholderLayout activeMenu={2} activeSubMenu={1} subMenuItems={subMenuItems(id as string, 'stakeholder')}>
      <StakeholderPositionList stakeholderId={String(id)} />
    </StakeholderLayout>
  );
}


StakeholderPositionIndex.acl = {
  action: 'view',
  subject: 'stakeholder-position'
};

export default StakeholderPositionIndex;
