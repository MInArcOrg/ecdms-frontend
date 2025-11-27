import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import subMenuItems, { findSubMenuItem, generalInfoMenuIds } from '../(sub-menu-items)';
import ProfessionalAddressList from 'src/views/pages/resources/details/resource-professional-address';
import AddressList from 'src/views/generics/address/address-list';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), generalInfoMenuIds.generalInfo.address);

const AddressPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.generalInfo}
      activeSubMenuId={generalInfoMenuIds.generalInfo.address}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>
              <AddressList modelId={String(id)} type={'professional-address'} />
      </>
    </ResourceLayout>
  );
};

AddressPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default AddressPage;
