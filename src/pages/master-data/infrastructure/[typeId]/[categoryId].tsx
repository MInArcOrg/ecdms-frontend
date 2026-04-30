// pages/master-data/[id].tsx
import React from 'react';
import MasterDataDetail from 'src/views/pages/master/master-data';

const MasterDataDetailPage= () => {
  return <MasterDataDetail model="project" />;
};

MasterDataDetailPage.acl = {
    action: "view",
    subject: "infrastructuresubcategory"
};

export default MasterDataDetailPage;
