import ProjectOtherLayout from 'src/views/pages/projects/detail/other/layouts/project-other-layout';
import RailwayStationList from 'src/views/pages/projects/detail/other/railway/railway-station';
import subMenuItems, { findOtherModelName } from '../(subMenuItems)';
import { useRouter } from 'next/router';

function RailwayPage() {
  const router = useRouter();
  const { id, typeId } = router.query;
  const baseUrl = `/projects/${typeId}/details/${id}/other`;
  const activeMenu = 8;
  const activeType = 5;
  const activeSubType = 17;

  return (
    <ProjectOtherLayout
      activeMenu={activeMenu}
      activeType={activeType}
      activeSubMenu={activeSubType}
      subMenuItems={subMenuItems}
      baseUrl={baseUrl}
    >
      <RailwayStationList
        model={findOtherModelName(subMenuItems(baseUrl), activeType, activeSubType) || ''}
        projectId={String(id)}
        typeId={String(typeId)}
      />
    </ProjectOtherLayout>
  );
}

export default RailwayPage;
