import { useRouter } from 'next/router';
import { AddressType } from 'src/types/admin/address';
import AddressMasterList from 'src/views/admin/address-master/list';

const AddressMasterListPage = ({}) => {
  const router = useRouter();
  const { type } = router.query;

  return <AddressMasterList type={type as AddressType} />;
};
AddressMasterListPage.authGuard = true;
export default AddressMasterListPage;
