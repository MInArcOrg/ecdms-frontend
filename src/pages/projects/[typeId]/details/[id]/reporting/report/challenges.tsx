import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectReportingIds } from '../(subMenuItems)';
import ProjectChallengeList from 'src/views/pages/projects/detail/project-challenges';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectReportingIds.report.challenges);

const ChallengesPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectReportingIds.report.challenges);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.reporting}
      activeSubMenuId={projectReportingIds.report.challenges}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ProjectChallengeList projectId={String(id)} typeId={String(typeId)} model={menuItem?.model || ''} />
    </ProjectLayout>
  );
};

ChallengesPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ChallengesPage;