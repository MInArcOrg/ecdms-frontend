// pages/master-data/[id].tsx
import MasterDataDetail from 'src/views/pages/master/master-data';

const MasterDataDetailPage = () => {
  return <MasterDataDetail model="infrastructure" />;
};

MasterDataDetailPage.acl = {
  action: 'view',
  subject: 'infrastructurecategory'
};


export default MasterDataDetailPage;
