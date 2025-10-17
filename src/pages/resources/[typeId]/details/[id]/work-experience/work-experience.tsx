import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import ResourceWorkExperienceList from 'src/views/pages/resources/details/resource-work-experience';
import subMenuItems, { findSubMenuItem, workExperienceMenuIds } from './(sub-menu-items)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), workExperienceMenuIds.workExperience);

const ResourceEducationPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), workExperienceMenuIds.workExperience);

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.workExperience}
      activeSubMenuId={workExperienceMenuIds.workExperience}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ResourceWorkExperienceList otherSubMenu={menuItem} professionalId={String(id)} typeId={String(typeId)} />
    </ResourceLayout>
  );
};

// Access control configuration
ResourceEducationPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ResourceEducationPage;
