import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, regulationIds } from '../(subMenuItems)';
import EnvironmentalAndSocialImpactList from 'src/views/pages/projects/detail/other/electric-power/environmental-and-social-impact';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    regulationIds.regulatoryAndEnvironmentalOversight.environmentalAndSocialImpact
);

const EnvironmentalAndSocialImpactPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        regulationIds.regulatoryAndEnvironmentalOversight.environmentalAndSocialImpact
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.regulation}
            activeSubMenuId={regulationIds.regulatoryAndEnvironmentalOversight.environmentalAndSocialImpact}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <EnvironmentalAndSocialImpactList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            />
        </ProjectLayout>
    );
};

// Access control configuration
EnvironmentalAndSocialImpactPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default EnvironmentalAndSocialImpactPage;