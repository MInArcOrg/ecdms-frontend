import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(sub-menu-items)';
import JointVentureList from 'src/views/pages/stakeholders/details/joint-ventures';

function JointVentureIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={0} activeSubMenu={3} subMenuItems={subMenuItems(id as string, typeId as string)}>
      {/* <JointVentureList /> */}
      <JointVentureList model="stakeholder-joint-venture" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

JointVentureIndex.acl = {
  subject: 'stakeholder',
  action: 'view_joint_venture'
};

export default JointVentureIndex;
