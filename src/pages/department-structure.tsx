import Department from 'src/types/department/department';
import StructureComponent from 'src/views/pages/centers/structure-component';

const MainDepartmentStructure = () => {
  return <StructureComponent parentDepartment={{} as Department} viewAll={true} />;
};

export default MainDepartmentStructure;
