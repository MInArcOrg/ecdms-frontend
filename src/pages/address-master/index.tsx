import { AddressType } from 'src/types/admin/address';
import AddressMasterView from 'src/views/admin/address-master/view';

const AddressMasterViewPage = ({}) => {
  return <AddressMasterView initialType={AddressType.COUNTRY} />;
};
AddressMasterViewPage.authGuard = true;
export default AddressMasterViewPage;
