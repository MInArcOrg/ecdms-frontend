import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import subMenuItems, { findSubMenuItem, generalInfoMenuIds } from '../(sub-menu-items)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), generalInfoMenuIds.generalInfo.contact);

const ContactPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.generalInfo}
      activeSubMenuId={generalInfoMenuIds.generalInfo.contact}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>
        {/* Replace with your actual component */}
        <div>Contact Content</div>
      </>
    </ResourceLayout>
  );
};

ContactPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ContactPage;
