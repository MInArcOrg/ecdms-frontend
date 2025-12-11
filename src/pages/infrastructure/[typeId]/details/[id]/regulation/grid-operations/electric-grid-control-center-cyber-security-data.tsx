import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, regulationIds } from '../(subMenuItems)';
import ElectricGridControlCenterCyberSecurityDataList from 'src/views/pages/projects/detail/other/electric-power/electric-grid-control-center-cyber-security-data';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), regulationIds.gridOperations.electricGridControlCenterCyberSecurityData);

const ElectricGridControlCenterCyberSecurityDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    regulationIds.gridOperations.electricGridControlCenterCyberSecurityData
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.regulation}
      activeSubMenuId={regulationIds.gridOperations.electricGridControlCenterCyberSecurityData}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ElectricGridControlCenterCyberSecurityDataList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            /> 
      <>Electric grid control center</>
    </ProjectLayout>
  );
};

// Access control configuration
ElectricGridControlCenterCyberSecurityDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ElectricGridControlCenterCyberSecurityDataPage;
