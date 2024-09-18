import { useRouter } from 'next/router';
import TelecomInfrastructureList from 'src/views/pages/projects/detail/other/telecom-infrastructure';
import subMenuItems, { findOtherModelName } from './(subMenuItems)';
import StakeholderOtherLayout from 'src/views/pages/stakeholders/other/layouts/stakeholder-other-layout';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;
  const baseUrl = `/stakeholders/${typeId}/details/${id}/other`;
  const activeMenu = 2;
  const activeType = 1;
  const activeSubType = 1;

  return (
    <StakeholderOtherLayout
      activeMenu={activeMenu}
      activeType={1}
      activeSubMenu={activeSubType}
      subMenuItems={subMenuItems}
      baseUrl={baseUrl}
    >
      <TelecomInfrastructureList
        model={findOtherModelName(subMenuItems(baseUrl), activeType, activeSubType) || ''}
        projectId={String(id)}
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
