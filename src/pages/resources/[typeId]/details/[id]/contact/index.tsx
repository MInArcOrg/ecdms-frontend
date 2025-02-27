import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import ProfessionalContactList from 'src/views/pages/resources/details/resource-professional-contact';
import subMenuItems from '../general-info/(sub-menu-items)';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ResourceLayout activeMenu={0} activeSubMenu={1} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProfessionalContactList model="professional-contact" professionalId={String(id)} typeId={String(typeId)} />
    </ResourceLayout>
  );
}

Index.acl = {
  action: 'view',
  subject: 'professional-contact'
};

export default Index;
