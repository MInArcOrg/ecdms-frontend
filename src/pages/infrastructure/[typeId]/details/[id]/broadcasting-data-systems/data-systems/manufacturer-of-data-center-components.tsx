import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, broadcastingDataSystemsId } from '../(subMenuItems)';
import DataCenterComponentManufacturerList from 'src/views/pages/projects/detail/other/telecom/data-center-component-manufacturer';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), broadcastingDataSystemsId.dataSystems.manufacturerOfDataCenterComponents);

const ManufacturerOfDataCenterComponentsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    broadcastingDataSystemsId.dataSystems.manufacturerOfDataCenterComponents
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.broadcastingDataSystems}
      activeSubMenuId={broadcastingDataSystemsId.dataSystems.manufacturerOfDataCenterComponents}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <DataCenterComponentManufacturerList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
ManufacturerOfDataCenterComponentsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ManufacturerOfDataCenterComponentsPage;
