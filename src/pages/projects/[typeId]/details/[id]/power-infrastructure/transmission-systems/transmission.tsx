import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import TransmissionList from 'src/views/pages/projects/detail/other/electric-power/transmission';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerInfrastructureIds.transmissionSystems.transmission);

const TransmissionPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), powerInfrastructureIds.transmissionSystems.transmission);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.transmissionSystems.transmission}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <TransmissionList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
TransmissionPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default TransmissionPage;
