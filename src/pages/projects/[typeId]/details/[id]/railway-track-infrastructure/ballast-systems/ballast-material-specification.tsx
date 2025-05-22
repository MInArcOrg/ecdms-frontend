import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayTrackInfrastructureIds.ballastSystems.ballastMaterialSpecification
);

const BallastMaterialSpecificationPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayTrackInfrastructureIds.ballastSystems.ballastMaterialSpecification
    );
    menuItem;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayTrackInfrastructure}
            activeSubMenuId={railwayTrackInfrastructureIds.ballastSystems.ballastMaterialSpecification}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Ballast Material Specification List Placeholder</div>
        </ProjectLayout>
    );
};

BallastMaterialSpecificationPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default BallastMaterialSpecificationPage;