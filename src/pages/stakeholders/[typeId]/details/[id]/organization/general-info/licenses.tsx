import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import StakeholderLicenseList from 'src/views/pages/stakeholders/details/stakeholder-license';

function StakeholderGeneralInoIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.ORGANIZATION}
      activeSubMenuId={stakeholderOrganizationIds.generalInfo.licenses}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakeholderLicenseList stakeholderId={id as string} typeId={typeId as string} />
    </StakeholderLayout>
  );
}

StakeholderGeneralInoIndex.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default StakeholderGeneralInoIndex;
