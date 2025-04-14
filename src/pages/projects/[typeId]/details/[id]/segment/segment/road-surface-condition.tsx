import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import IntersectionDrivewayList from 'src/views/pages/projects/detail/other/road/intersection-and-driveway';
import subMenuItems, { findSubMenuItem, projectSegmentIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    projectSegmentIds.segment.roadSurfaceCondition
);


const RoadSurfaceCondition = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        projectSegmentIds.segment.roadSurfaceCondition
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.segment}
            activeSubMenuId={projectSegmentIds.segment.roadSurfaceCondition}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <IntersectionDrivewayList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            />
        </ProjectLayout>
    );
};

// Access control configuration
RoadSurfaceCondition.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default RoadSurfaceCondition;