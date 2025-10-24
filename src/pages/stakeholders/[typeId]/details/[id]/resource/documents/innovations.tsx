import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderResourceIds } from '../(sub-menu-items)';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import StakeholderDocumentList from 'src/views/pages/stakeholders/details/stakeholder-document';
import { documentTypeVariantObjects } from 'src/views/pages/stakeholders/details/stakeholder-document/file-type-config';

function StakeholderStrategyIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.RESOURCE}
      activeSubMenuId={stakeholderResourceIds.documents.innovations}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakeholderDocumentList
        model="stakeholderdocument"
        stakeholderId={String(id)}
        typeId={String(typeId)}
        documentType={documentTypeVariantObjects.innovation.value} />
    </StakeholderLayout>
  );
}

StakeholderStrategyIndex.acl = {
  action: 'view',
  subject: 'stakeholderdocument'
};

export default StakeholderStrategyIndex;
