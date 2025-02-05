import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import subMenuItems from './(sub-menu-items)';
import JointVentureList from 'src/views/pages/stakeholders/details/joint-ventures';

function JointVentureIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ResourceLayout activeMenu={0} activeSubMenu={3} subMenuItems={subMenuItems(id as string, typeId as string)}>
      {/* <JointVentureList /> */}
      <JointVentureList model="stakeholder-joint-venture" stakeholderId={String(id)} typeId={String(typeId)} />
    </ResourceLayout>
  );
}

JointVentureIndex.acl = {
  subject: 'stakeholder',
  action: 'view_joint_venture'
};

export default JointVentureIndex;
