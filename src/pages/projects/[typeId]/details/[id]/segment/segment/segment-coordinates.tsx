import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectSegmentIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    projectSegmentIds.segment.segmentCoordinates
);


const SegmentCoordinate = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        projectSegmentIds.segment.segmentCoordinates
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.segment}
            activeSubMenuId={projectSegmentIds.segment.segmentCoordinates}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <>Segment coordinates</>
        </ProjectLayout>
    );
};

// Access control configuration
SegmentCoordinate.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default SegmentCoordinate;