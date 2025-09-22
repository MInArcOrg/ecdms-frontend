import { useRouter } from "next/router";
import StakeholderLayout from "src/views/pages/stakeholders/details/layout/stakeholder-layout";
import { stakeholderMenuIds } from "src/views/pages/stakeholders/details/layout/stakeholder-menu-items";
import subMenuItems, { stakeholderOrganizationIds } from "../(sub-menu-items)";
import StakeholderUpgradeList from "src/views/pages/stakeholders/details/stakeholder-upgrade";

function StakeholderUpgradeIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.ORGANIZATION}
      activeSubMenuId={stakeholderOrganizationIds.generalInfo.upgrade}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakeholderUpgradeList
        model="stakeholder-manager"
        stakeholderId={String(id)}
        typeId={String(typeId)}
      />
    </StakeholderLayout>
  );
}

StakeholderUpgradeIndex.acl = {
  subject: "resource",
  action: "view_resource",
};

export default StakeholderUpgradeIndex;
