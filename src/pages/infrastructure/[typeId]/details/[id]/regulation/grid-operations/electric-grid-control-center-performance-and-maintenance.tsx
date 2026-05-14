import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, regulationIds } from '../(subMenuItems)';
import ElectricGridControlCenterPerformanceAndMaintenanceList from 'src/views/pages/projects/detail/other/electric-power/electric-grid-control-center-performance-and-maintenance';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  regulationIds.gridOperations.electricGridControlCenterPerformanceAndMaintenance
);

const ElectricGridControlCenterPerformanceAndMaintenancePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    regulationIds.gridOperations.electricGridControlCenterPerformanceAndMaintenance
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.regulation}
      activeSubMenuId={regulationIds.gridOperations.electricGridControlCenterPerformanceAndMaintenance}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ElectricGridControlCenterPerformanceAndMaintenanceList otherSubMenu={menuItem}  projectId={id as string} typeId={typeId as string} />
    </ProjectLayout>
  );
};

// Access control configuration
ElectricGridControlCenterPerformanceAndMaintenancePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ElectricGridControlCenterPerformanceAndMaintenancePage;
