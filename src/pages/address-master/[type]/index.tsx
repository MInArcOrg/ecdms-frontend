import { useRouter } from 'next/router';
import { AddressType } from 'src/types/admin/address';
import AddressMasterView from 'src/views/admin/address-master/view';

const AddressMasterViewPage = ({ }) => {
  const router = useRouter();
  const { type } = router.query;

  return <AddressMasterView initialType={type as AddressType} />;
};
AddressMasterViewPage.authGuard = true;
AddressMasterViewPage.acl = {
  action: 'view',
  subject: 'addressmaster'
};
export default AddressMasterViewPage;
