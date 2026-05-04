// src/views/stakeholder/document/document-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { parseISO } from 'date-fns';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  STAKEHOLDER_DOCUMENT_FILE_TYPES,
  STAKEHOLDER_DOCUMENT_ENTITY_SUBJECT,
  DocumentTypeVariant
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import StakeholderDocumentCard from './stakeholder-document-card';
import StakeholderDocumentDrawer from './stakeholder-document-drawer';
import { stakeholderDocumentColumns } from './stakeholder-document-row';
import { StakeholderDocument } from 'src/types/stakeholder/other';
import stakeholderDocumentApiService from 'src/services/stakeholder/stakeholder-document-service';


interface StakeholderDocumentListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
  documentType: DocumentTypeVariant; // The current document type page
}

const StakeholderDocumentList: React.FC<StakeholderDocumentListProps> = ({ model, stakeholderId, documentType }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderDocument | null>(null);
  const { t } = useTranslation();

  const entitySubject = STAKEHOLDER_DOCUMENT_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = STAKEHOLDER_DOCUMENT_FILE_TYPES[0].type;

  // --- 1. Dynamic Title/Action Key Generation
  const getContextualKey = (baseKey: 'title' | 'detail' | 'create' | 'edit'): string => {
    // Lowercase and replace underscores for the i18n key path (e.g., 'CODE_OF_CONDUCT' -> 'code-of-conduct')
    const typeSegment = documentType.toLowerCase().replace(/_/g, '-');

    // The specific key path (e.g., stakeholder.document.type.strategy.title)
    return `stakeholder.document.type.${typeSegment}.${baseKey}`;
  };

  const listTitleKey = getContextualKey('title');
  const detailTitleKey = getContextualKey('detail');
  const createTitleKey = getContextualKey('create');
  const editTitleKey = getContextualKey('edit');


  // --- 2. Fetch Function (Filtering by documentType)
  const fetchRecord = (params: GetRequestParam): Promise<IApiResponse<StakeholderDocument[]>> => {
    return stakeholderDocumentApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId, document_type: documentType }
    });
  };

  const {
    data: recordData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderDocument[]>({
    queryKey: ['stakeholderDocument', documentType], // Use documentType as part of the query key
    fetchFunction: fetchRecord
  });


  const toggleDrawer = () => {
    // When creating, pre-set the document_type with the current page's documentType
    setSelectedRow({ document_type: documentType } as StakeholderDocument);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderDocument);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: StakeholderDocument) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await stakeholderDocumentApiService.delete(id);
    refetch();
  };

  const handleClickDetail = (data: StakeholderDocument) => {
    setShowDetailDrawer(true);
    setSelectedRow(data);
  };


  const mapRecordToDetailItems = (data: StakeholderDocument): { title: string; value: any }[] => [
    // ... detail mapping remains the same
    {
      title: t('stakeholder.document.details.document-type'),
      value: data?.document_type || 'N/A'
    },
    {
      title: t('stakeholder.document.details.title'),
      value: data?.title || 'N/A'
    },
    // ... other fields and file drawer component remain the same
  ];

  return (
    <Box>
      {showDrawer && (
        <StakeholderDocumentDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholderDocument={selectedRow as StakeholderDocument}
          refetch={refetch}
          stakeholderId={stakeholderId}
          fileTypesConfig={STAKEHOLDER_DOCUMENT_FILE_TYPES}
          // Pass the contextualized keys to the drawer
          titleKey={createTitleKey}
          editTitleKey={editTitleKey}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRecordToDetailItems(selectedRow as StakeholderDocument)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType={FILE_TYPE_DEFAULT}
          title={t(detailTitleKey)} // Use contextual detail key
        />
      )}

      <ItemsListing
        title={t(listTitleKey)} // Use contextual list title
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: stakeholderDocumentColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            model,
            STAKEHOLDER_DOCUMENT_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderDocumentCard
            onDetail={handleClickDetail}
            stakeholderDocument={data as StakeholderDocument}
            onEdit={handleEdit}
            refetch={refetch}
            model={model}
            onDelete={handleDelete}
            fileTypesConfig={STAKEHOLDER_DOCUMENT_FILE_TYPES}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'stakeholderdocument'
          }
        }}
        fetchDataFunction={refetch}
        items={recordData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default StakeholderDocumentList;