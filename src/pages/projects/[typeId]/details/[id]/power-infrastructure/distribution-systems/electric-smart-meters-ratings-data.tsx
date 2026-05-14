import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import ElectricSmartMetersRatingsDataList from 'src/views/pages/projects/detail/other/electric-power/electric-smart-meters-ratings-data';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerInfrastructureIds.distributionSystems.electricSmartMetersRatingsData);

const ElectricSmartMetersRatingsDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.distributionSystems.electricSmartMetersRatingsData
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.distributionSystems.electricSmartMetersRatingsData}
      subMenuItems={subMenuItems}
    >
      <ElectricSmartMetersRatingsDataList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
ElectricSmartMetersRatingsDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ElectricSmartMetersRatingsDataPage;
