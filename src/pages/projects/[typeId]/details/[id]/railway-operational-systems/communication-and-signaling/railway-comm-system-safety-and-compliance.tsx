import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import RailwayCommunicationSystemSafetyAndComplianceList from 'src/views/pages/projects/detail/other/road/railway-communication-system-safety-and-compliance';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.communicationAndSignaling.railwayCommSystemSafetyAndCompliance
);

const RailwayCommSystemSafetyAndCompliancePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.communicationAndSignaling.railwayCommSystemSafetyAndCompliance
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.communicationAndSignaling.railwayCommSystemSafetyAndCompliance}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayCommunicationSystemSafetyAndComplianceList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

RailwayCommSystemSafetyAndCompliancePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayCommSystemSafetyAndCompliancePage;
