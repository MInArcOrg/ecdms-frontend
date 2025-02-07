import { useRouter } from 'next/router';
import ResourceLayout from '../../../../../../views/pages/resources/details/layout/resource-layout';
import ProfessionalAddressList from '../../../../../../views/pages/resources/details/resource-professional-address';

import subMenuItems from './(sub-menu-items)';
function EmployeeBranchIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ResourceLayout activeMenu={0} activeSubMenu={0} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProfessionalAddressList
        model="professional-address"
        professionalId={id as string}
        typeId={typeId as string}
      />
    </ResourceLayout>
  );
}

EmployeeBranchIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default EmployeeBranchIndex;