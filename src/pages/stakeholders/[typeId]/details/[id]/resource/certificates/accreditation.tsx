import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import subMenuItems, { stakeholderResourceIds } from '../(sub-menu-items)';
import StakeholderAccreditationList from 'src/views/pages/stakeholders/details/stakeholder-accreditation';

function StakeholderInformation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.RESOURCE}
      activeSubMenuId={stakeholderResourceIds.certificates.accreditation}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakeholderAccreditationList stakeholderId={id as string} />
    </StakeholderLayout>
  );
}

StakeholderInformation.acl = {
  subject: 'stakeholderaccreditation',
  action: 'view'
};

export default StakeholderInformation;
