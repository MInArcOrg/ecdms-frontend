import { useRouter } from 'next/router';
import OtherLayout from 'src/views/pages/projects/detail/other/layouts/other-layout';
import RoadInfoList from 'src/views/pages/projects/detail/other/road/road-info';
import subMenuItems, { findOtherModelName } from '../(subMenuItems)';
import RoadSegmentList from 'src/views/pages/projects/detail/other/road/road-segment';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;
  const baseUrl = `/projects/${typeId}/details/${id}/other`;
  const activeMenu = 8;
  const activeType = 2;
  const activeSubType = 4;

  return (
    <OtherLayout
      activeMenu={activeMenu}
      activeType={activeType}
      activeSubMenu={activeSubType}
      subMenuItems={subMenuItems}
      baseUrl={baseUrl}
    >
      <RoadSegmentList
        model={findOtherModelName(baseUrl, activeType, activeSubType) || ''}
        projectId={String(id)}
        typeId={String(typeId)}
      />
    </OtherLayout>
  );
}

Index.acl = {
  action: 'view_other',
  subject: 'other'
};

export default Index;
