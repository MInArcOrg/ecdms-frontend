import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import TransmissionLineInformationList from 'src/views/pages/projects/detail/other/electric-power/transmission-line-information';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerInfrastructureIds.transmissionSystems.transmissionLineInformation);

const TransmissionLineInformationPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.transmissionSystems.transmissionLineInformation
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.transmissionSystems.transmissionLineInformation}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <TransmissionLineInformationList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
TransmissionLineInformationPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default TransmissionLineInformationPage;
