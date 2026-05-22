import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import subMenuItems, { stakeholderProjectIds } from '../(sub-menu-items)';
import JointVentureProjectList from 'src/views/pages/stakeholders/details/joint-venture-project';

function JointVentureProjectsIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.PROJECTS}
      activeSubMenuId={stakeholderProjectIds.projects.jointVentureProjects}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <JointVentureProjectList stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

JointVentureProjectsIndex.acl = {
  subject: 'stakeholder',
  action: 'view'
};

export default JointVentureProjectsIndex;
