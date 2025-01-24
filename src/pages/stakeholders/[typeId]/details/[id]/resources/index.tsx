import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(sub-menu-items)';

function EmployeeEducation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={3} activeSubMenu={1} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <></>
    </StakeholderLayout>
  );
}

EmployeeEducation.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default EmployeeEducation;
