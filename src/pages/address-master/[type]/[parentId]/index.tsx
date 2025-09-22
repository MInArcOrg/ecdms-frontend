import { useRouter } from "next/router";
import { AddressType } from "src/types/admin/address";
import AddressMasterList from "src/views/admin/address-master/list";

const AddressMasterListPage = ({}) => {
  const router = useRouter();
  const { type, parentId } = router.query;

  return (
    <AddressMasterList
      type={type as AddressType}
      parentId={parentId as string}
    />
  );
};
AddressMasterListPage.authGuard = true;
export default AddressMasterListPage;
