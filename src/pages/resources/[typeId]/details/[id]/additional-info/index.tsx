import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import ProfessionalAdditionalInfoList from 'src/views/pages/resources/details/professional-additional-info';
import subMenuItems from '../general-info/(sub-menu-items)';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ResourceLayout activeMenu={0} activeSubMenu={3} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProfessionalAdditionalInfoList model="professional-additional-info" professionalId={String(id)} typeId={String(typeId)} />
    </ResourceLayout>
  );
}

Index.acl = {
  action: 'view',
  subject: 'professional-additional-info'
};

export default Index;
