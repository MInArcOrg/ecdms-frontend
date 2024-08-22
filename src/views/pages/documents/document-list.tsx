import { Box, Card } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import documentApiService from 'src/services/document/document-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { Document } from 'src/types/document';
import ItemsListing from 'src/views/shared/listing';
import DocumentCard from './document-card';
import DocumentDrawer from './document-drawer';
import { documentColumns } from './document-row';
import DocumentDetail from './document-detail';

function DocumentList() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<Document | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { typeId } = router.query;
  const fetchDocuments = (params: GetRequestParam): Promise<IApiResponse<Document[]>> => {
    return documentApiService.getAll({ ...params, filter: { ...params.filter, documenttype_id: typeId } });
  };

  const {
    data: documents,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Document[]>({
    queryKey: ['documents'],
    fetchFunction: fetchDocuments
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Document);
    setShowDrawer(!showDrawer);
  };
  const toggleDetailDrawer = () => {
    setSelectedRow({} as Document);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (document: Document) => {
    toggleDrawer();
    setSelectedRow(document);
  };
  const handleDelete = async (documentId: string) => {
    await documentApiService.delete(documentId);
    refetch();
  };
  const handleClickDetail = (document: Document) => {
    toggleDetailDrawer();
    setSelectedRow(document);
  };
  return (
    <Box>
      {showDrawer && (
        <DocumentDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          document={selectedRow as Document}
          refetch={refetch}
          typeId={String(typeId)}
        />
      )}
      <Card>
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          ItemViewComponent={({ data }) => (
            <DocumentCard
              onDetail={handleClickDetail}
              document={data}
              onDelete={handleDelete}
              onEdit={handleEdit}
              t={t}
              refetch={refetch}
            />
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: false,
            permission: {
              action: 'create',
              subject: 'document'
            }
          }}
          fetchDataFunction={refetch}
          tableProps={{
            headers: documentColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
          }}
          items={documents || []}
          onPaginationChange={handlePageChange}
        />
      </Card>
      {showDetailDrawer && (
        <DocumentDetail documentId={String(selectedRow?.id)} show={showDetailDrawer} toggleDetail={toggleDetailDrawer} />
      )}
    </Box>
  );
}
export default DocumentList;
