import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, broadcastingDataSystemsId } from '../(subMenuItems)';
import BroadcastingInfrastructureManufacturerList from 'src/views/pages/projects/detail/other/telecom/broadcasting-infrastructure-manufacturer';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  broadcastingDataSystemsId.broadcasting.manufacturerOfBroadcastingInfrastructure
);

const ManufacturerOfBroadcastingInfrastructurePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    broadcastingDataSystemsId.broadcasting.manufacturerOfBroadcastingInfrastructure
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.broadcastingDataSystems}
      activeSubMenuId={broadcastingDataSystemsId.broadcasting.manufacturerOfBroadcastingInfrastructure}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <BroadcastingInfrastructureManufacturerList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
ManufacturerOfBroadcastingInfrastructurePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ManufacturerOfBroadcastingInfrastructurePage;
