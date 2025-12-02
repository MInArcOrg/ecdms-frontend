import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import SafetyAndHealthList from 'src/views/pages/projects/detail/other/road/safety-and-health';
import subMenuItems, { findSubMenuItem, projectSegmentIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectSegmentIds.design.safetyAndHealth);

const SafetyAndHealth = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectSegmentIds.design.safetyAndHealth);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.segment}
      activeSubMenuId={projectSegmentIds.design.safetyAndHealth}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <SafetyAndHealthList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
SafetyAndHealth.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SafetyAndHealth;
