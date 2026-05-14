import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import TransmissionLineEquipmentDataList from 'src/views/pages/projects/detail/other/electric-power/transmission-line-equipment-data';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerInfrastructureIds.transmissionSystems.transmissionLineEquipmentData);

const TransmissionLineEquipmentDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.transmissionSystems.transmissionLineEquipmentData
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.transmissionSystems.transmissionLineEquipmentData}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <TransmissionLineEquipmentDataList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
TransmissionLineEquipmentDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default TransmissionLineEquipmentDataPage;
