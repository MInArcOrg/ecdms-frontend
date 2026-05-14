import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import SubstationLayoutAndCommunicationDataList from 'src/views/pages/projects/detail/other/electric-power/substation-layout-and-communication-data';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  powerInfrastructureIds.transmissionSystems.substationLayoutAndCommunicationData
);

const SubstationLayoutAndCommunicationDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.transmissionSystems.substationLayoutAndCommunicationData
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.transmissionSystems.substationLayoutAndCommunicationData}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <SubstationLayoutAndCommunicationDataList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
SubstationLayoutAndCommunicationDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SubstationLayoutAndCommunicationDataPage;
