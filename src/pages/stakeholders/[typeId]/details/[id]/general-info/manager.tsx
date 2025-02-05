import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import subMenuItems from './(sub-menu-items)';
import StakeholderManagerList from 'src/views/pages/stakeholders/details/stakeholder-manager';

function StakeholderManagerIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ResourceLayout activeMenu={0} activeSubMenu={0} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderManagerList model="stakeholder-manager" stakeholderId={String(id)} typeId={String(typeId)} />
    </ResourceLayout>
  );
}

StakeholderManagerIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default StakeholderManagerIndex;
