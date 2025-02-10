import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import subMenuItems from './(sub-menu-items)';
import ProfessionalWorkExperienceList from 'src/views/pages/resources/details/resource-work-experience';

function EmployeeWorkExperienceIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ResourceLayout activeMenu={3} activeSubMenu={1} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProfessionalWorkExperienceList model="professional-work-experience" professionalId={String(id)} typeId={String(typeId)} />
    </ResourceLayout>
  );
}

EmployeeWorkExperienceIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default EmployeeWorkExperienceIndex;
