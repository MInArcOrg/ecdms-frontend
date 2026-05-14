import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import ElectricSmartMetersPrivacyAndSecurityDataList from 'src/views/pages/projects/detail/other/electric-power/electric-smart-meters-privacy-and-security-data';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  powerInfrastructureIds.distributionSystems.electricSmartMetersPrivacyAndSecurityData
);

const ElectricSmartMetersPrivacyAndSecurityDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.distributionSystems.electricSmartMetersPrivacyAndSecurityData
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.distributionSystems.electricSmartMetersPrivacyAndSecurityData}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <ElectricSmartMetersPrivacyAndSecurityDataList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
ElectricSmartMetersPrivacyAndSecurityDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ElectricSmartMetersPrivacyAndSecurityDataPage;
