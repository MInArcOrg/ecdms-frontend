import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, telecomInfrastructureId } from '../(subMenuItems)';
import TelecomInfrastructureManufacturerList from 'src/views/pages/projects/detail/other/telecom/telecom-infrastructure-manufacturer';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), telecomInfrastructureId.telecom.telecomInfrastructureManufacturer);

const TelecomInfrastructureManufacturer = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    telecomInfrastructureId.telecom.telecomInfrastructureManufacturer
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.telecomInfrastructure}
      activeSubMenuId={telecomInfrastructureId.telecom.telecomInfrastructureManufacturer}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <TelecomInfrastructureManufacturerList
        otherSubMenu={menuItem}
        typeId={String(typeId)}
        projectId={String(id)}
      />
    </ProjectLayout>
  );
};

// Access control configuration
TelecomInfrastructureManufacturer.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default TelecomInfrastructureManufacturer;
