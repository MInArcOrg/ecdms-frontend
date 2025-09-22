import { useRouter } from "next/router";
import StakeholderLayout from "src/views/pages/stakeholders/details/layout/stakeholder-layout";
import StakeholderCertificateList from "src/views/pages/stakeholders/details/stakeholder-certificate";
import subMenuItems, { stakeholderResourceIds } from "../(sub-menu-items)";
import { stakeholderMenuIds } from "src/views/pages/stakeholders/details/layout/stakeholder-menu-items";

function StakeholderInformation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.RESOURCE}
      activeSubMenuId={stakeholderResourceIds.certificates.certificates}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakeholderCertificateList
        stakeholderId={String(id)}
        type={String(id)}
      />
    </StakeholderLayout>
  );
}

StakeholderInformation.acl = {
  subject: "stakeholderinfo",
  action: "view_stakeholderinfo",
};

export default StakeholderInformation;
