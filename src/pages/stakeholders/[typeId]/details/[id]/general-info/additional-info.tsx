import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(sub-menu-items)';
import StakeholderAdditionaInfolList from 'src/views/pages/stakeholders/details/stakeholder-additional-info';

function StakeholderManagerIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={0} activeSubMenu={5} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderAdditionaInfolList model="stakeholder-additional-info" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

StakeholderManagerIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default StakeholderManagerIndex;
