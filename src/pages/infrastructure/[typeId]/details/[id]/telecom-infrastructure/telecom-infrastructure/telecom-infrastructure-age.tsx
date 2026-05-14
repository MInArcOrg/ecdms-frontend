import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import TelecomInfrastructureAgeList from 'src/views/pages/projects/detail/other/telecom/telecom-infrastructure-age';
import subMenuItems, { findSubMenuItem, telecomInfrastructureId } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), telecomInfrastructureId.telecom.telecomInfrastructureAge);

const TelecomInfrastructureAge = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), telecomInfrastructureId.telecom.telecomInfrastructureAge);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.telecomInfrastructure}
      activeSubMenuId={telecomInfrastructureId.telecom.telecomInfrastructureAge}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <TelecomInfrastructureAgeList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
TelecomInfrastructureAge.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default TelecomInfrastructureAge;
