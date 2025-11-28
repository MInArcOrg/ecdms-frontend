import DoucmentList from 'src/views/pages/documents/document-list';

const DoucmentPage = () => {
  return <DoucmentList />;
};

DoucmentPage.acl = {
  action: 'view',
  subject: 'document'
};
export default DoucmentPage;
