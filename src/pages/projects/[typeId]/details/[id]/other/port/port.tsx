// pages/projects/[typeId]/details/[id]/other/port.tsx
import ProjectOtherLayout from 'src/views/pages/projects/detail/other/layouts/project-other-layout';
import PortList from 'src/views/pages/projects/detail/other/port';
import subMenuItems, { findOtherModelName } from '../(subMenuItems)';
import { useRouter } from 'next/router';

function PortPage() {
  const router = useRouter();
  const { id, typeId } = router.query;
  const baseUrl = `/projects/${typeId}/details/${id}/other`;
  const activeMenu = 8;
  const activeType = 7;
  const activeSubType = 22;

  return (
    <ProjectOtherLayout
      activeMenu={activeMenu}
      activeType={activeType}
      activeSubMenu={activeSubType}
      subMenuItems={subMenuItems}
      baseUrl={baseUrl}
    >
      <PortList
        model={findOtherModelName(subMenuItems(baseUrl), activeType, activeSubType) || ''}
        projectId={String(id)}
        typeId={String(typeId)}
      />
    </ProjectOtherLayout>
  );
}

PortPage.acl = {
  action: 'view_other',
  subject: 'other',
};

export default PortPage;
