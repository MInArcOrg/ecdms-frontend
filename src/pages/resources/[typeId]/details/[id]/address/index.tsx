import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import ProfessionalAddressList from 'src/views/pages/resources/details/resource-professional-address';
import subMenuItems from '../general-info/(sub-menu-items)';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ResourceLayout activeMenu={0} activeSubMenu={0} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProfessionalAddressList model="professional-address" professionalId={String(id)} typeId={String(typeId)} />
    </ResourceLayout>
  );
}

Index.acl = {
  action: 'view',
  subject: 'professional-address'
};

export default Index;
