import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import TotalEmployeeList from 'src/views/pages/stakeholders/employees/total-employee';
import subMenuItems from './(subMenuItems)';

function TotalEmployee() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={1} activeSubMenu={0} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <>
        <TotalEmployeeList stakeholderId={id as string} />
      </>
    </StakeholderLayout>
  );
}

TotalEmployee.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default TotalEmployee;
