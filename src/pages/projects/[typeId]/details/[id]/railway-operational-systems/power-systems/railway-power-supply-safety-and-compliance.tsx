import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayPowerSupplySafetyAndComplianceList from 'src/views/pages/projects/detail/other/road/railway-power-supply-safety-and-compliance';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.powerSystems.railwayPowerSupplySafetyAndCompliance
);

const RailwayPowerSupplySafetyAndCompliancePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.powerSystems.railwayPowerSupplySafetyAndCompliance
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.powerSystems.railwayPowerSupplySafetyAndCompliance}
      subMenuItems={subMenuItems}
    >
      <RailwayPowerSupplySafetyAndComplianceList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

RailwayPowerSupplySafetyAndCompliancePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayPowerSupplySafetyAndCompliancePage;
