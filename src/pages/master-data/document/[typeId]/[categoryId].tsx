// pages/master-data/[id].tsx
import MasterDataDetail from 'src/views/pages/master/master-data';

const MasterDataDetailPage = () => {
  return <MasterDataDetail model="document" />;
};

MasterDataDetailPage.acl = {
  action: 'view',
  subject: 'documentcategory'
};

export default MasterDataDetailPage;
