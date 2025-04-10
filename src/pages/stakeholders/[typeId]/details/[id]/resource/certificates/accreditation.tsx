import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import subMenuItems, { stakeholderResourceIds } from '../(sub-menu-items)';

function StakeholderInformation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.RESOURCE}
      activeSubMenuId={stakeholderResourceIds.certificates.accreditation}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>accreditation need to be added here</>
    </StakeholderLayout>
  );
}

StakeholderInformation.acl = {
  subject: 'stakeholderinfo',
  action: 'view_stakeholderinfo'
};

export default StakeholderInformation;
