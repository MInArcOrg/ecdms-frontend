import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import { certificatesMenuIds } from './(sub-menu-items)';
import subMenuItems, { findSubMenuItem } from './(sub-menu-items)';
import ProfessionalRecommendationList from 'src/views/pages/resources/details/resource-professional-recommendation';
const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), certificatesMenuIds.recommendations);

const RecommendationsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.certificates}
      activeSubMenuId={certificatesMenuIds.recommendations}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ProfessionalRecommendationList professionalId={id as string} />
    </ResourceLayout>
  );
};

RecommendationsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RecommendationsPage;
