import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import MaterialList from 'src/views/pages/stakeholders/details/stakeholder-materials';
import subMenuItems, { stakeholderResourceIds } from '../(sub-menu-items)';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function StakeholderMaterialIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenuId={stakeholderMenuIds.RESOURCE} activeSubMenuId={stakeholderResourceIds.resources.constructionMaterials} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <MaterialList stakeholderId={String(id)} />
    </StakeholderLayout>
  );
}

StakeholderMaterialIndex.acl = {
  action: 'view',
  subject: 'stakeholdermaterial'
};

export default StakeholderMaterialIndex;
