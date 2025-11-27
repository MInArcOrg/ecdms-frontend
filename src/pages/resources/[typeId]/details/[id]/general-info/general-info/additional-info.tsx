import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import subMenuItems, { findSubMenuItem, generalInfoMenuIds } from '../(sub-menu-items)';
import ProfessionalAdditionalInfoList from 'src/views/pages/resources/details/professional-additional-info';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), generalInfoMenuIds.generalInfo.additionalInfo);

const AdditionalInfoPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.generalInfo}
      activeSubMenuId={generalInfoMenuIds.generalInfo.additionalInfo}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>
        <ProfessionalAdditionalInfoList model={defaultMenuItem?.model || ''}  professionalId={id as string} typeId={typeId as string} />
      </>
    </ResourceLayout>
  );
};

AdditionalInfoPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default AdditionalInfoPage;
