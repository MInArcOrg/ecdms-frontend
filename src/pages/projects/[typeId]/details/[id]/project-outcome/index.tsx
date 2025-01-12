import { useRouter } from 'next/router';
import ProjectOutcomeList from 'src/views/pages/projects/detail/project-outcome';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';

function Index() {
    const router = useRouter();
    const { id, typeId } = router.query;

    return (
        <ProjectLayout activeMenu={10} activeSubMenu={0} subMenuItems={subMenuItems(String(id), String(typeId))}>
            <ProjectOutcomeList
                model="project-outcome"
                projectId={String(id)}
                typeId={String(typeId)} 
            />
        </ProjectLayout>
    );
}

Index.acl = {
    action: 'view_project_outcome',
    subject: 'project-outcome'
};

export default Index; 