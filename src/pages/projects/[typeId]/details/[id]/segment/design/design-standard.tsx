import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import DesignStandardList from 'src/views/pages/projects/detail/other/road/design-standard';
import subMenuItems, { findSubMenuItem, projectSegmentIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectSegmentIds.design.designStandard);

const DesignStandard = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectSegmentIds.design.designStandard);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.segment}
      activeSubMenuId={projectSegmentIds.design.designStandard}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <DesignStandardList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
DesignStandard.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default DesignStandard;
