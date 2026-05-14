import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, broadcastingDataSystemsId } from '../(subMenuItems)';
import DataCenterList from 'src/views/pages/projects/detail/other/telecom/data-center';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), broadcastingDataSystemsId.dataSystems.dataCenters);

const DataCentersPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), broadcastingDataSystemsId.dataSystems.dataCenters);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.broadcastingDataSystems}
      activeSubMenuId={broadcastingDataSystemsId.dataSystems.dataCenters}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <DataCenterList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
DataCentersPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default DataCentersPage;
