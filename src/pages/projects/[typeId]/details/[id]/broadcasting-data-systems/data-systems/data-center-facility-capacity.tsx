import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, broadcastingDataSystemsId } from '../(subMenuItems)';
import DataCenterFacilityCapacityList from 'src/views/pages/projects/detail/other/telecom/data-center-facility-capacity';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    broadcastingDataSystemsId.dataSystems.dataCenterFacilityCapacity
);

const DataCenterFacilityCapacityPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        broadcastingDataSystemsId.dataSystems.dataCenterFacilityCapacity
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.broadcastingDataSystems}
            activeSubMenuId={broadcastingDataSystemsId.dataSystems.dataCenterFacilityCapacity}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <DataCenterFacilityCapacityList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            />
        </ProjectLayout>
    );
};

// Access control configuration
DataCenterFacilityCapacityPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default DataCenterFacilityCapacityPage;