import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.communicationAndSignaling.railwayCommunicationSystem
);

const RailwayEnvironmentalAndOtherFactors = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.communicationAndSignaling.railwayEnvironmentalAndOtherFactors
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.communicationAndSignaling.railwayEnvironmentalAndOtherFactors}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Railway Communication System Placeholder</div>
    </ProjectLayout>
  );
};

RailwayEnvironmentalAndOtherFactors.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayEnvironmentalAndOtherFactors;
