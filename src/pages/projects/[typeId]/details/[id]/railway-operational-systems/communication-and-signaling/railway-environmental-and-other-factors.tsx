import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayEnvironmentalAndOtherFactorList from 'src/views/pages/projects/detail/other/road/railway-environmental-and-other-factor';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.communicationAndSignaling.railwayEnvironmentalAndOtherFactors
);

const RailwayEnvironmentalAndOtherFactorsPage = () => {
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
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <RailwayEnvironmentalAndOtherFactorList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

RailwayEnvironmentalAndOtherFactorsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayEnvironmentalAndOtherFactorsPage;
