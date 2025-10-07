import { useRouter } from "next/router";
import AddressStructureComponent from "src/views/admin/address-master/address-structure-component";

const MainDepartmentStructure = () => {
  const { id } = useRouter().query;
  return <AddressStructureComponent parentAddressId={String(id)} viewAll={true} />;
};
export default MainDepartmentStructure;
