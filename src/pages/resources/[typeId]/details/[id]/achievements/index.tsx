import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import subMenuItems from './(sub-menu-items)';
import CertificationList from 'src/views/pages/resources/details/resource-professional-certification';

function EmployeeBranchIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ResourceLayout activeMenu={5} activeSubMenu={0} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <CertificationList model="professional-certification" professionalId={String(id)} typeId={String(typeId)} />
    </ResourceLayout>
  );
}

EmployeeBranchIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default EmployeeBranchIndex;
