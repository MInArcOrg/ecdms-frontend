import { useRouter } from "next/router";
import StructureComponent from "src/views/pages/centers/structure-component";

const MainDepartmentStructure = () => {
  const { id } = useRouter().query;
  return <StructureComponent parentDepartmentId={String(id)} viewAll={false} />;
};
export default MainDepartmentStructure;
