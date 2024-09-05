import { useRouter } from 'next/router';
import TransformerTypeList from 'src/views/pages/projects/detail/other/electric-power/transformer-type';
import OtherLayout from 'src/views/pages/projects/detail/other/layouts/other-layout';
import subMenuItems, { findOtherModelName } from '../(subMenuItems)';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;
  const baseUrl = `/projects/${typeId}/details/${id}/other`;
  const activeMenu = 8;
  const activeType = 4;
  const activeSubType = 12;

  return (
    <OtherLayout
      activeMenu={activeMenu}
      activeType={activeType}
      activeSubMenu={activeSubType}
      subMenuItems={subMenuItems}
      baseUrl={baseUrl}
    >
      <TransformerTypeList
        model={findOtherModelName(subMenuItems(baseUrl), activeType, activeSubType) || ''}
        projectId={String(id)}
        typeId={String(typeId)}
      />
    </OtherLayout>
  );
}

Index.acl = {
  action: 'view_other',
  subject: 'other'
};

export default Index;
