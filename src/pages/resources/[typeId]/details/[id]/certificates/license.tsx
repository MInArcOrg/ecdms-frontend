import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import { certificatesMenuIds } from './(sub-menu-items)';
import subMenuItems, { findSubMenuItem } from './(sub-menu-items)';
import ProfessionalLicenseList from 'src/views/pages/resources/details/resource-professional-license';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), certificatesMenuIds.license);

const LicensePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.certificates}
      activeSubMenuId={certificatesMenuIds.license}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>
        <ProfessionalLicenseList model={defaultMenuItem?.model || ''} professionalId={id as string} />

      </>
    </ResourceLayout>
  );
};

LicensePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default LicensePage;
