import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, telecomInfrastructureId } from '../(subMenuItems)';
import TelecomInfrastructureList from 'src/views/pages/projects/detail/other/telecom/telecom-infrastructure';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), telecomInfrastructureId.telecom.telecomInfrastructure);

const IntersectionAndDriveWay = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), telecomInfrastructureId.telecom.telecomInfrastructure);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.telecomInfrastructure}
      activeSubMenuId={telecomInfrastructureId.telecom.telecomInfrastructure}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <TelecomInfrastructureList
        otherSubMenu={menuItem}
        typeId={String(typeId)}
        projectId={String(id)}
      />
    </ProjectLayout>
  );
};

// Access control configuration
IntersectionAndDriveWay.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default IntersectionAndDriveWay;
