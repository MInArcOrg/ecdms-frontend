import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayTrackInfrastructureIds.sleeperAndFasteningSystems.fasteningSystemEnvironmentalFactors
);

const FasteningSystemEnvironmentalFactorsPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayTrackInfrastructureIds.sleeperAndFasteningSystems.fasteningSystemEnvironmentalFactors
    );
    menuItem;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayTrackInfrastructure}
            activeSubMenuId={railwayTrackInfrastructureIds.sleeperAndFasteningSystems.fasteningSystemEnvironmentalFactors}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Fastening System Environmental Factors Placeholder </div>
        </ProjectLayout>
    );
};

FasteningSystemEnvironmentalFactorsPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default FasteningSystemEnvironmentalFactorsPage;