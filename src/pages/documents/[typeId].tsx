import DocumentList from 'src/views/pages/documents/document-list';

const DocumentPage = () => {
  return <DocumentList />;
};

DocumentPage.acl = {
  action: 'view',
  subject: 'document'
};
export default DocumentPage;
