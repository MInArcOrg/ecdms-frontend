import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import subMenuItems, { findSubMenuItem, generalInfoMenuIds } from '../(sub-menu-items)';
import ProfessionalContactPersonList from 'src/views/pages/resources/details/resource-professional-contact-person';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), generalInfoMenuIds.generalInfo.contactPerson);

const ContactPersonPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.generalInfo}
      activeSubMenuId={generalInfoMenuIds.generalInfo.contactPerson}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ProfessionalContactPersonList model={defaultMenuItem?.model || ''} professionalId={id as string} />

    </ResourceLayout>
  );
};

ContactPersonPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ContactPersonPage;
