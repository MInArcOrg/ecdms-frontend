// pages/master-data/[id].tsx
import React from 'react';
import MasterDataDetail from 'src/views/pages/master/master-data';

const MasterDataDetailPage = () => {
  return <MasterDataDetail model="document" />;
};

MasterDataDetailPage.acl = {
  action: 'view',
  subject: 'documenttype'
};

export default MasterDataDetailPage;
