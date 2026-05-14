import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';
import CulvertBasicDataList from 'src/views/pages/projects/detail/other/road/culvert-basic-data';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.culvert.culvertBasicData);

const CulvertBasicData = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.culvert.culvertBasicData);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.culvert.culvertBasicData}
      subMenuItems={subMenuItems}
    >
      <CulvertBasicDataList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

CulvertBasicData.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default CulvertBasicData;
