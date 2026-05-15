import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import { certificatesMenuIds } from './(sub-menu-items)';
import subMenuItems, { findSubMenuItem } from './(sub-menu-items)';
import CertificationList from 'src/views/pages/resources/details/resource-professional-certification';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), certificatesMenuIds.certificates);

const CertificatesPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.certificates}
      activeSubMenuId={certificatesMenuIds.certificates}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>
        {/* Replace with your actual Certificates component */}
        <CertificationList model={defaultMenuItem?.model || ''} professionalId={id as string} typeId={typeId as string} />
      </>
    </ResourceLayout>
  );
};

CertificatesPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default CertificatesPage;
