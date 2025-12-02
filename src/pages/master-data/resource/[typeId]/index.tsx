// pages/master-data/[id].tsx
import React from 'react';
import MasterDataDetail from 'src/views/pages/master/master-data';

const MasterDataDetailPage = () => {
  return <MasterDataDetail model="resource" />;
};

MasterDataDetailPage.acl = {
  action: 'view',
  subject: 'resourcetype'
};

export default MasterDataDetailPage;
