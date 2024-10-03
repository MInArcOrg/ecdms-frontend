import { useRouter } from 'next/router';
import StakeholderOtherLayout from 'src/views/pages/stakeholders/other/layouts/stakeholder-other-layout';
import subMenuItems, { findOtherModelName } from './(subMenuItems)';
import StakeholderServiceList from 'src/views/pages/stakeholders/other/stakeholder-specific/stakeholder-service';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;
  const baseUrl = `/stakeholders/${typeId}/details/${id}/other`;
  const activeMenu = 2;
  const activeType = 1;
  const activeSubType = 5;

  return (
    <StakeholderOtherLayout
      activeMenu={activeMenu}
      activeType={1}
      activeSubMenu={activeSubType}
      subMenuItems={subMenuItems}
      baseUrl={baseUrl}
    >
      <StakeholderServiceList
        model={findOtherModelName(subMenuItems(baseUrl), activeType, activeSubType) || ''}
        stakeholderId={String(id)}
        typeId={String(typeId)}
      />
    </StakeholderOtherLayout>
  );
}

Index.acl = {
  action: 'view_other',
  subject: 'other'
};

export default Index;
