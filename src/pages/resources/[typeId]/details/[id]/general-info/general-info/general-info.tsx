import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, generalInfoMenuIds } from '../(sub-menu-items)';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  generalInfoMenuIds.generalInfo.generalInfo
);

const GeneralInfoPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.generalInfo}
      activeSubMenuId={generalInfoMenuIds.generalInfo.generalInfo}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <></>
    </ResourceLayout>
  );
};

// Access control configuration
GeneralInfoPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default GeneralInfoPage;