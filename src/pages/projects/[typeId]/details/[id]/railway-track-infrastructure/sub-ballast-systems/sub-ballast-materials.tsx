import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterials
);

const SubBallastMaterialsPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterials
    );
    menuItem;
    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayTrackInfrastructure}
            activeSubMenuId={railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterials}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Sub-Ballast Materials List Placeholder</div>
        </ProjectLayout>
    );
};

SubBallastMaterialsPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default SubBallastMaterialsPage;