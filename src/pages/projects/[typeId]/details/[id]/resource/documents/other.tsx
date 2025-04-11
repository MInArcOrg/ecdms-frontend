import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { projectResourceIds } from '../(subMenuItems)';

const ProjectStakeholder = () => {
    const router = useRouter();
    const { id, typeId } = router.query;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.resource}
            activeSubMenuId={projectResourceIds.documents.other}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <>project other goes here</>
        </ProjectLayout>
    );
};

ProjectStakeholder.acl = {
    subject: 'projectdesign',
    action: 'view'
};

export default ProjectStakeholder;
