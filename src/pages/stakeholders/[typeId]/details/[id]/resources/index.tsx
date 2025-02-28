import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import MachineryList from 'src/views/pages/stakeholders/details/stakeholder-machineries';
import subMenuItems from './(sub-menu-items)';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={3} activeSubMenu={0} subMenuItems={subMenuItems(id as string, String(typeId))}>
      <MachineryList stakeholderId={String(id)} />
    </StakeholderLayout>
  );
}

Index.acl = {
  action: 'view',
  subject: 'stakeholder-machinery'
};

export default Index;
