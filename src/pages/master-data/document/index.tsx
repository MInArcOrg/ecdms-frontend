// pages/master-data/[id].tsx
import React from 'react';
import MasterDataDetail from 'src/views/pages/master/master-data';

const MasterDataDetailPage: React.FC = () => {
  return <MasterDataDetail model="document" />;
};

export default MasterDataDetailPage;
