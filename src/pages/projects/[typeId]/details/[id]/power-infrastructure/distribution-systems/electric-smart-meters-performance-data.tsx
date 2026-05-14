import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import ElectricSmartMetersPerformanceDataList from 'src/views/pages/projects/detail/other/electric-power/electric-smart-meters-performance-data';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  powerInfrastructureIds.distributionSystems.electricSmartMetersPerformanceData
);

const ElectricSmartMetersPerformanceDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.distributionSystems.electricSmartMetersPerformanceData
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.distributionSystems.electricSmartMetersPerformanceData}
      subMenuItems={subMenuItems}
    >
      <ElectricSmartMetersPerformanceDataList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
ElectricSmartMetersPerformanceDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ElectricSmartMetersPerformanceDataPage;
