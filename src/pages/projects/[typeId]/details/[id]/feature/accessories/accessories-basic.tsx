import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import IntersectionDrivewayList from 'src/views/pages/projects/detail/other/road/intersection-and-driveway';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    projectFeatureIds.accessories.accessoriesBasic
);


const AccessoriesBasic = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        projectFeatureIds.accessories.accessoriesBasic
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.feature}
            activeSubMenuId={projectFeatureIds.accessories.accessoriesBasic}
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
AccessoriesBasic.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default AccessoriesBasic;