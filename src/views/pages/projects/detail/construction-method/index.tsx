'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import constructionMethodApiService from 'src/services/project/construction-method-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ConstructionMethodCard from './construction-method-card';
import ConstructionMethodDrawer from './construction-method-drawer';
import type { ConstructionMethod } from 'src/types/project/construction-method';
import { constructionMethodColumns } from './construction-method-row';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface ConstructionMethodListProps {
  projectId: string;
}

const ConstructionMethodList: React.FC<ConstructionMethodListProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ConstructionMethod | null>(null);
  const { t } = useTranslation();

  const fetchConstructionMethods = (params: GetRequestParam): Promise<IApiResponse<ConstructionMethod[]>> => {
    return constructionMethodApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: constructionMethods,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ConstructionMethod[]>({
    queryKey: ['construction-methods', projectId],
    fetchFunction: fetchConstructionMethods
  });

  const toggleDrawer = () => {
    if (showDrawer) {
      setSelectedRow(null);
    }
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    if (showDetailDrawer) {
      setSelectedRow(null);
    }
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (method: ConstructionMethod) => {
    setSelectedRow(method);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await constructionMethodApiService.delete(id);
    refetch();
  };

  const handleClickDetail = (method: ConstructionMethod) => {
    setSelectedRow(method);
    setShowDetailDrawer(true);
  };

  const mapMethodToDetailItems = (method: ConstructionMethod): { title: string; value: string }[] => [
    {
      title: t('project.construction-method.method'),
      value: method?.projectMethod?.title || method?.project_method?.title || method?.project_method_id || 'N/A'
    },
    {
      title: t('project.construction-method.description'),
      value: method?.description || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: method?.created_at ? formatCreatedAt(method.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <ConstructionMethodDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          projectId={projectId}
          constructionMethod={selectedRow}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={selectedRow ? mapMethodToDetailItems(selectedRow) : []}
          id={selectedRow?.id || ''}
          hasReference={true} // Assuming true for now
          fileType="CONSTRUCTION_METHOD"
          title={t('project.construction-method.details')}
        />
      )}

      <ItemsListing
        title={t('project.construction-method.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: constructionMethodColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ConstructionMethodCard
            constructionMethod={data}
            refetch={refetch}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDetail={handleClickDetail}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'constructionmethod' // Adjust subject as needed
          }
        }}
        fetchDataFunction={refetch}
        items={constructionMethods || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ConstructionMethodList;
