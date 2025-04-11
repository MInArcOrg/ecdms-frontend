import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectSegmentIds } from '../(subMenuItems)';
import TrafficParameterList from 'src/views/pages/projects/detail/other/road/traffic-parameter';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    projectSegmentIds.segment.trafficParameters
);


const TrafficParameter = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        projectSegmentIds.segment.trafficParameters
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.segment}
            activeSubMenuId={projectSegmentIds.segment.trafficParameters}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <TrafficParameterList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            />
        </ProjectLayout>
    );
};

// Access control configuration
TrafficParameter.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default TrafficParameter;