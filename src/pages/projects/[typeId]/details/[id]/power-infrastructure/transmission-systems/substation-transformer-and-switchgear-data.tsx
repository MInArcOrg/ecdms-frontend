import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import SubstationTransformerAndSwitchgearDataList from 'src/views/pages/projects/detail/other/electric-power/substation-transformer-and-switchgear-data';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  powerInfrastructureIds.transmissionSystems.substationTransformerAndSwitchgearData
);

const SubstationTransformerAndSwitchgearDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.transmissionSystems.substationTransformerAndSwitchgearData
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.transmissionSystems.substationTransformerAndSwitchgearData}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <SubstationTransformerAndSwitchgearDataList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
SubstationTransformerAndSwitchgearDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SubstationTransformerAndSwitchgearDataPage;
