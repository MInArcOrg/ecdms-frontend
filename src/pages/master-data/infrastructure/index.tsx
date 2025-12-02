// pages/master-data/[id].tsx
import React from 'react';
import MasterDataDetail from 'src/views/pages/master/master-data';

const MasterDataDetailPage= () => {
  return <MasterDataDetail model="infrastructure" />;
};

MasterDataDetailPage.acl = {
  action: 'view',
  subject: 'infrastructuremasterdata'
};

export default MasterDataDetailPage;
