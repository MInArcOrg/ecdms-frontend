import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, regulationIds } from '../(subMenuItems)';
import ElectricGridControlCenterDataList from 'src/views/pages/projects/detail/other/electric-power/electric-grid-control-center-data';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), regulationIds.gridOperations.electricGridControlCenterData);

const ElectricGridControlCenterDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    regulationIds.gridOperations.electricGridControlCenterData
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.regulation}
      activeSubMenuId={regulationIds.gridOperations.electricGridControlCenterData}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ElectricGridControlCenterDataList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
ElectricGridControlCenterDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ElectricGridControlCenterDataPage;
