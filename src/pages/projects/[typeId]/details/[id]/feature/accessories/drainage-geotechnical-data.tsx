import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import GeotechnicalInformationList from 'src/views/pages/projects/detail/other/road/geotechnical-information';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.accessories.drainageGeotechnicalData);

const DrainageGeotechnicalData = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;
  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.accessories.drainageGeotechnicalData);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.accessories.drainageGeotechnicalData}
      subMenuItems={subMenuItems}
    >
      <GeotechnicalInformationList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

DrainageGeotechnicalData.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default DrainageGeotechnicalData;
