import { useRouter } from "next/router";
import StakeholderLayout from "src/views/pages/stakeholders/details/layout/stakeholder-layout";
import StakeholderPositionList from "src/views/pages/stakeholders/details/stakeholder-positions";
import subMenuItems, { stakeholderOrganizationIds } from "../(sub-menu-items)";
import { stakeholderMenuIds } from "src/views/pages/stakeholders/details/layout/stakeholder-menu-items";

function StakeholderPositionIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.ORGANIZATION}
      activeSubMenuId={stakeholderOrganizationIds.companyStructure.positions}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakeholderPositionList stakeholderId={String(id)} />
    </StakeholderLayout>
  );
}

StakeholderPositionIndex.acl = {
  action: "view",
  subject: "stakeholder-position",
};

export default StakeholderPositionIndex;
